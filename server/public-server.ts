import express, { type Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSupportTicketSchema } from "@shared/schema";
import { authenticateToken } from "./middleware/auth";
import authRoutes from "./routes/auth";
import { z } from "zod";

// Public server - only public and user routes, NO admin functionality
export function createPublicServer(): Server {
  const app = express();

  // Security headers for public server
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "blob:"],
        mediaSrc: ["'self'", "blob:"],
        connectSrc: ["'self'"],
      },
    },
  }));

  // CORS for public server
  app.use(cors({
    origin: process.env.PUBLIC_ALLOWED_ORIGINS?.split(',') || ['http://localhost:5000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  // Rate limiting for public routes
  const publicLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per 15 minutes
    message: {
      error: "Too many requests from this IP, please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Stricter rate limiting for auth routes
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Only 5 auth attempts per 15 minutes
    message: {
      error: "Too many authentication attempts, please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.use(publicLimiter);
  app.use("/api/auth/login", authLimiter);
  app.use("/api/auth/register", authLimiter);

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: false, limit: '10mb' }));

  // Public request logging
  app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;

    res.on("finish", () => {
      const duration = Date.now() - start;
      if (path.startsWith("/api")) {
        console.log(`[PUBLIC] ${req.method} ${path} ${res.statusCode} in ${duration}ms`);
      }
    });
    next();
  });

  // Serve uploaded files with authentication
  app.use("/uploads", authenticateToken as any, (req, res, next) => {
    next();
  }, express.static(path.join(process.cwd(), "uploads")));

  // Authentication routes
  app.use("/api/auth", authRoutes);
  
  // Protected routes that require authentication
  app.use("/api/auth/me", authenticateToken as any);
  app.use("/api/auth/refresh", authenticateToken as any);

  // Public course routes (no authentication required)
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await storage.getAllCourses();
      res.json({ courses });
    } catch (error) {
      console.error("Get courses error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/courses/:courseId", async (req, res) => {
    try {
      const { courseId } = req.params;
      const course = await storage.getCourse(courseId);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      
      // Get course modules and lessons for public viewing
      const modules = await storage.getCourseModules(courseId);
      const courseWithModules = {
        ...course,
        modules: await Promise.all(modules.map(async (module) => ({
          ...module,
          lessons: await storage.getModuleLessons(module.id)
        })))
      };
      
      res.json({ course: courseWithModules });
    } catch (error) {
      console.error("Get course error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Protected support ticket routes
  app.get("/api/support-tickets/user/:userId", authenticateToken as any, async (req: any, res) => {
    try {
      const { userId } = req.params;
      // Users can only see their own tickets
      if (req.user.id !== userId) {
        return res.status(403).json({ error: "Access denied" });
      }
      
      const tickets = await storage.getSupportTicketsByUserId(userId);
      res.json({ tickets });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/support-tickets", authenticateToken as any, async (req: any, res) => {
    try {
      const ticketData = insertSupportTicketSchema.parse({
        ...req.body,
        user_id: req.user.id // Ensure ticket belongs to authenticated user
      });
      const ticket = await storage.createSupportTicket(ticketData);
      res.json({ ticket });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Protected user stats routes
  app.get("/api/users/:userId/stats", authenticateToken as any, async (req: any, res) => {
    try {
      const { userId } = req.params;
      // Users can only see their own stats
      if (req.user.id !== userId) {
        return res.status(403).json({ error: "Access denied" });
      }
      
      const stats = await storage.getUserStats(userId);
      res.json({ stats });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Protected enrollment routes
  app.get("/api/users/:userId/enrollments", authenticateToken as any, async (req: any, res) => {
    try {
      const { userId } = req.params;
      // Users can only see their own enrollments
      if (req.user.id !== userId) {
        return res.status(403).json({ error: "Access denied" });
      }
      
      const enrollments = await storage.getUserEnrollments(userId);
      res.json({ enrollments });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/enrollments", authenticateToken as any, async (req: any, res) => {
    try {
      const { courseId } = req.body;
      // Users can only enroll themselves
      const userId = req.user.id;
      
      const enrollment = await storage.enrollUserInCourse(userId, courseId);
      res.json({ enrollment });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Protected assessment routes
  app.get("/api/users/:userId/assessments", authenticateToken as any, async (req: any, res) => {
    try {
      const { userId } = req.params;
      // Users can only see their own assessments
      if (req.user.id !== userId) {
        return res.status(403).json({ error: "Access denied" });
      }
      
      const assessments = await storage.getUserAssessments(userId);
      res.json({ assessments });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Catch-all for undefined public routes
  app.use('/api/*', (req, res) => {
    res.status(404).json({ error: 'API endpoint not found' });
  });

  // Public error handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(`[PUBLIC ERROR] ${err.message}`);
    
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ error: message });
  });

  const httpServer = createServer(app);
  return httpServer;
}