import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertCourseSchema, insertSupportTicketSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
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

  // User routes
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json({ users: users.map(user => ({ id: user.id, email: user.email, nome: user.nome, role: user.role, created_at: user.created_at })) });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ user: { id: user.id, email: user.email, nome: user.nome, role: user.role } });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/users/:id", async (req, res) => {
    try {
      const updateData = req.body;
      const user = await storage.updateUser(req.params.id, updateData);
      res.json({ user: { id: user.id, email: user.email, nome: user.nome, role: user.role } });
    } catch (error) {
      if (error instanceof Error && error.message === 'User not found') {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/users/:id", async (req, res) => {
    try {
      await storage.deleteUser(req.params.id);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      if (error instanceof Error && error.message === 'User not found') {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Course routes
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await storage.getAllCourses();
      res.json({ courses });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/courses/:id", async (req, res) => {
    try {
      const course = await storage.getCourse(req.params.id);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.json({ course });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/courses", async (req, res) => {
    try {
      const courseData = insertCourseSchema.parse(req.body);
      const course = await storage.createCourse(courseData);
      res.json({ course });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Support ticket routes
  app.get("/api/support-tickets/user/:userId", async (req, res) => {
    try {
      const tickets = await storage.getSupportTicketsByUserId(req.params.userId);
      res.json({ tickets });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/support-tickets", async (req, res) => {
    try {
      const ticketData = insertSupportTicketSchema.parse(req.body);
      const ticket = await storage.createSupportTicket(ticketData);
      res.json({ ticket });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/support-tickets/:id", async (req, res) => {
    try {
      const updateData = req.body;
      const ticket = await storage.updateSupportTicket(req.params.id, updateData);
      res.json({ ticket });
    } catch (error) {
      if (error instanceof Error && error.message === 'Support ticket not found') {
        return res.status(404).json({ error: "Support ticket not found" });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Dashboard stats routes
  app.get("/api/users/:userId/stats", async (req, res) => {
    try {
      const stats = await storage.getUserStats(req.params.userId);
      res.json({ stats });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/stats", async (req, res) => {
    try {
      const stats = await storage.getAdminStats();
      res.json({ stats });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Enrollment routes
  app.get("/api/users/:userId/enrollments", async (req, res) => {
    try {
      const enrollments = await storage.getUserEnrollments(req.params.userId);
      res.json({ enrollments });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/enrollments", async (req, res) => {
    try {
      const { userId, courseId } = req.body;
      const enrollment = await storage.enrollUserInCourse(userId, courseId);
      res.json({ enrollment });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Assessment routes
  app.get("/api/users/:userId/assessments", async (req, res) => {
    try {
      const assessments = await storage.getUserAssessments(req.params.userId);
      res.json({ assessments });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
