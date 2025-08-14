import { createPublicServer } from "./public-server";
import { createAdminServer } from "./admin-server";
import { setupVite, serveStatic, log } from "./vite";

(async () => {
  const isDevelopment = process.env.NODE_ENV === "development";

  // Public server (main application)
  const publicServer = createPublicServer();

  // Setup Vite for public server in development
  if (isDevelopment) {
    const express = await import("express");
    const publicApp = express.default();
    await setupVite(publicApp, publicServer);
    
    // Mount public routes
    publicApp.use((req, res, next) => {
      if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
        return publicServer.emit('request', req, res);
      }
      next();
    });
  } else {
    // Serve static files in production
    const express = await import("express");
    const publicApp = express.default();
    serveStatic(publicApp);
  }

  // Start public server on port 5000
  const publicPort = 5000;
  publicServer.listen({
    port: publicPort,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`🌐 Public server running on port ${publicPort}`);
  });

  // Admin server (completely isolated) - only in production or when explicitly enabled
  if (process.env.ENABLE_ADMIN_SERVER === "true" || !isDevelopment) {
    const adminServer = createAdminServer();
    const adminPort = parseInt(process.env.ADMIN_PORT || "5001");
    
    adminServer.listen({
      port: adminPort,
      host: "127.0.0.1", // Admin only accessible from localhost for security
      reusePort: true,
    }, () => {
      log(`🔐 Admin server running on port ${adminPort} (localhost only)`);
      log(`⚠️  Admin panel: http://localhost:${adminPort}`);
    });
  } else {
    log(`ℹ️  Admin server disabled in development. Set ENABLE_ADMIN_SERVER=true to enable.`);
  }

  log(`✅ Servers started successfully`);
})();
