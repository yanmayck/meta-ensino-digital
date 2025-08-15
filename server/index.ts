import express, { type Request, Response, NextFunction } from "express";
import { setupVite, serveStatic, log } from "./vite";
import { storage } from "./storage";
import { insertSupportTicketSchema } from "@shared/schema";
import { authenticateToken } from "./middleware/auth";
import authRoutes from "./routes/auth";
import adminRoutes from "./routes/admin";
import { z } from "zod";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import path from "path";
import { createServer } from "http";

const app = express();

// Configure trust proxy for Replit environment
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "blob:"],
      mediaSrc: ["'self'", "blob:"],
    },
  },
}));

// Rate limiting with simplified config for Replit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => process.env.NODE_ENV === 'development' // Skip rate limiting in development
});

// Stricter rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Increased from 5 for better UX in development
  message: {
    error: "Too many authentication attempts, please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => process.env.NODE_ENV === 'development' // Skip rate limiting in development
});

app.use(limiter);
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Serve uploaded files statically with authentication check
app.use("/uploads", authenticateToken as any, (req, res, next) => {
  // Only authenticated users can access uploaded files
  next();
}, express.static(path.join(process.cwd(), "uploads")));

// Authentication routes
app.use("/api/auth", authRoutes);

// Protected routes that require authentication
app.use("/api/auth/me", authenticateToken as any);
app.use("/api/auth/refresh", authenticateToken as any);

// Admin routes (includes authentication middleware)
app.use("/api/admin", adminRoutes);

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

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
  throw err;
});

(async () => {
  const server = createServer(app);

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  try {
    if (app.get("env") === "development") {
      console.log("Setting up Vite...");
      await setupVite(app, server);
      console.log("Vite setup completed");
    } else {
      serveStatic(app);
    }
  } catch (error) {
    console.error("Error during Vite setup:", error);
    // Fall back to serving static files
    console.log("Falling back to static file serving...");
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  
  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use. Server will exit gracefully.`);
      process.exit(1);
    } else {
      console.error('Server error:', err);
    }
  });
  
  server.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
    console.log(`Server is now accepting connections on 0.0.0.0:${port}`);
    
    // Test the server immediately after startup
    setTimeout(async () => {
      try {
        const response = await fetch(`http://localhost:${port}/api/courses`);
        console.log(`Self-test response: ${response.status}`);
        const data = await response.json();
        console.log(`Self-test data:`, data);
      } catch (err: any) {
        console.log(`Self-test failed: ${err.message}`);
      }
    }, 1000);
  });
})();
