import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { storage } from "../storage";

const JWT_SECRET = process.env.JWT_SECRET || (() => {
  console.error("⚠️  WARNING: JWT_SECRET not set! Using fallback - NEVER use in production!");
  return "fallback-secret-key-change-in-production";
})();

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    nome: string | null;
    role: string;
  };
}

export function generateToken(user: { id: string; email: string; nome: string | null; role: string }): string {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      nome: user.nome, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
}

export async function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  try {
    const decoded = verifyToken(token);
    
    // Verify user still exists in database
    const user = await storage.getUser(decoded.id);
    if (!user || !user.is_active) {
      return res.status(401).json({ error: "User not found or inactive" });
    }

    req.user = {
      id: user.id,
      email: user.email,
      nome: user.nome,
      role: user.role
    };
    
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}

export function requireRole(roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }

    next();
  };
}

export const requireAdmin = requireRole(["admin"]);
export const requireAdminOrAnalyst = requireRole(["admin", "analyst"]);