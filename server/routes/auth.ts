import { Router } from "express";
import bcrypt from "bcryptjs";
import { storage } from "../storage";
import { insertUserSchema, loginSchema } from "@shared/schema";
import { generateToken, AuthRequest } from "../middleware/auth";
import { z } from "zod";

const router = Router();

// Register route
router.post("/register", async (req, res) => {
  try {
    const userData = insertUserSchema.parse(req.body);
    
    // Check if user already exists
    const existingUser = await storage.getUserByEmail(userData.email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    
    // Create user
    const user = await storage.createUser({
      ...userData,
      password: hashedPassword,
    });
    
    // Generate JWT token
    const token = generateToken({
      id: user.id,
      email: user.email,
      nome: user.nome,
      role: user.role
    });
    
    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        nome: user.nome,
        role: user.role,
        avatar_url: user.avatar_url
      },
      token
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: "Invalid input", 
        details: error.errors 
      });
    }
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    
    // Find user
    const user = await storage.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    
    // Check if user is active
    if (!user.is_active) {
      return res.status(401).json({ error: "Account is deactivated" });
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    
    // Generate JWT token
    const token = generateToken({
      id: user.id,
      email: user.email,
      nome: user.nome,
      role: user.role
    });
    
    res.json({
      user: {
        id: user.id,
        email: user.email,
        nome: user.nome,
        role: user.role,
        avatar_url: user.avatar_url
      },
      token
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: "Invalid input", 
        details: error.errors 
      });
    }
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get current user (protected route)
router.get("/me", async (req: AuthRequest, res) => {
  // This will be called after authentication middleware
  res.json({ user: req.user });
});

// Refresh token
router.post("/refresh", async (req: AuthRequest, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "Authentication required" });
    }
    
    // Generate new token
    const token = generateToken({
      id: user.id,
      email: user.email,
      nome: user.nome,
      role: user.role
    });
    
    res.json({ token });
  } catch (error) {
    console.error("Token refresh error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;