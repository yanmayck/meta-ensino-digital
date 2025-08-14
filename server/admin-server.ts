import express, { type Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import { createServer, type Server } from "http";
import { authenticateToken } from "./middleware/auth";
import adminRoutes from "./routes/admin";

// Dedicated admin server - completely isolated from public routes
export function createAdminServer(): Server {
  const app = express();

  // Stricter security for admin server
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'none'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'none'"],
        frameSrc: ["'none'"],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    }
  }));

  // Strict CORS for admin - only allow specific origins
  app.use(cors({
    origin: process.env.ADMIN_ALLOWED_ORIGINS?.split(',') || ['http://localhost:5001'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  // Very strict rate limiting for admin
  const adminLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 20, // Only 20 requests per 5 minutes
    message: {
      error: "Too many admin requests, please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
      // Skip rate limiting for health checks
      return req.path === '/health';
    }
  });

  app.use(adminLimiter);
  app.use(express.json({ limit: '5mb' })); // Smaller limit for admin
  app.use(express.urlencoded({ extended: false, limit: '5mb' }));

  // Admin request logging
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`[ADMIN] ${req.method} ${req.path} ${res.statusCode} in ${duration}ms - IP: ${req.ip}`);
    });
    next();
  });

  // Health check (no auth required)
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'admin-server', timestamp: new Date().toISOString() });
  });

  // ALL admin routes require authentication
  app.use(authenticateToken as any);

  // Admin routes with additional role checking
  app.use('/api/admin', adminRoutes);

  // Catch-all for undefined admin routes
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Admin endpoint not found' });
  });

  // Admin-specific error handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(`[ADMIN ERROR] ${err.message}`, err.stack);
    
    const status = err.status || err.statusCode || 500;
    const message = process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message;

    res.status(status).json({ 
      error: message,
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] || 'unknown'
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}