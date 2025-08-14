import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import express from "express";
import { storage } from "./storage";
import { insertUserSchema, insertCourseSchema, insertSupportTicketSchema } from "@shared/schema";
import { authenticateToken } from "./middleware/auth";
import authRoutes from "./routes/auth";
import adminRoutes from "./routes/admin";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
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

  // Legacy authentication routes (keeping for backward compatibility)
  app.post("/api/auth/register-legacy", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByEmail(userData.email);
      
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
      
      const user = await storage.createUser(userData);
      res.json({ user: { id: user.id, email: user.email, nome: user.nome, role: user.role } });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
      
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      res.json({ user: { id: user.id, email: user.email, nome: user.nome, role: user.role } });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Protected user routes - moved to admin panel
  // These routes are now handled in admin.ts with proper authentication

  // Protected course management routes - moved to admin panel
  // Course creation/editing now handled in admin.ts with proper authentication

  // Protected support ticket routes
  app.get("/api/support-tickets/user/:userId", authenticateToken as any, async (req: any, res) => {
    try {
      // Users can only see their own tickets, admins can see any
      const { userId } = req.params;
      if (req.user.role !== 'admin' && req.user.id !== userId) {
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
      // Users can only see their own stats, admins/analysts can see any
      if (!['admin', 'analyst'].includes(req.user.role) && req.user.id !== userId) {
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
      // Users can only see their own enrollments, admins/analysts can see any
      if (!['admin', 'analyst'].includes(req.user.role) && req.user.id !== userId) {
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
      // Users can only enroll themselves, admins can enroll anyone
      const userId = req.user.role === 'admin' ? req.body.userId : req.user.id;
      
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
      // Users can only see their own assessments, admins/analysts can see any
      if (!['admin', 'analyst'].includes(req.user.role) && req.user.id !== userId) {
        return res.status(403).json({ error: "Access denied" });
      }
      
      const assessments = await storage.getUserAssessments(userId);
      res.json({ assessments });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
