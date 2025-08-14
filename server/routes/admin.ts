import { Router } from "express";
import { storage } from "../storage";
import { requireAdmin, requireAdminOrAnalyst, AuthRequest } from "../middleware/auth";
import { uploadVideo, uploadMaterial, uploadThumbnail, getFileUrl } from "../middleware/upload";
import { insertCourseSchema, insertCourseModuleSchema, insertLessonSchema, insertCourseMaterialSchema } from "@shared/schema";
import { z } from "zod";

const router = Router();

// All routes require admin or analyst role
router.use(requireAdminOrAnalyst as any);

// Admin stats
router.get("/stats", async (req, res) => {
  try {
    const stats = await storage.getAdminStats();
    res.json({ stats });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// User management
router.get("/users", async (req, res) => {
  try {
    const users = await storage.getAllUsers();
    res.json({
      users: users.map(user => ({
        id: user.id,
        email: user.email,
        nome: user.nome,
        role: user.role,
        is_active: user.is_active,
        avatar_url: user.avatar_url,
        created_at: user.created_at
      }))
    });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/users/:userId", requireAdmin as any, async (req: AuthRequest, res) => {
  try {
    const { userId } = req.params;
    
    // Validate UUID format
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }
    
    // Validate and sanitize update data
    const allowedFields = ['nome', 'role', 'is_active', 'avatar_url'];
    const updateData = Object.keys(req.body)
      .filter(key => allowedFields.includes(key))
      .reduce((obj: any, key) => {
        obj[key] = req.body[key];
        return obj;
      }, {});
    
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }
    
    // Prevent self-role change
    if (updateData.role && req.user?.id === userId) {
      return res.status(403).json({ error: "Cannot change your own role" });
    }
    
    const user = await storage.updateUser(userId, updateData);
    
    res.json({
      user: {
        id: user.id,
        email: user.email,
        nome: user.nome,
        role: user.role,
        is_active: user.is_active,
        avatar_url: user.avatar_url
      }
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Course management
router.post("/courses", requireAdmin as any, async (req: AuthRequest, res) => {
  try {
    const courseData = insertCourseSchema.parse(req.body);
    const course = await storage.createCourse(courseData);
    res.status(201).json({ course });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid input", details: error.errors });
    }
    console.error("Create course error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/courses/:courseId", requireAdmin as any, async (req: AuthRequest, res) => {
  try {
    const { courseId } = req.params;
    const updateData = req.body;
    
    const course = await storage.updateCourse(courseId, updateData);
    res.json({ course });
  } catch (error) {
    console.error("Update course error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Upload course thumbnail
router.post("/courses/:courseId/thumbnail", requireAdmin as any, uploadThumbnail, async (req: AuthRequest, res) => {
  try {
    const { courseId } = req.params;
    
    if (!req.file) {
      return res.status(400).json({ error: "No thumbnail file uploaded" });
    }
    
    const thumbnailUrl = getFileUrl(req, `thumbnails/${req.file.filename}`);
    
    const course = await storage.updateCourse(courseId, {
      thumbnail_url: thumbnailUrl
    });
    
    res.json({ 
      course,
      thumbnail_url: thumbnailUrl 
    });
  } catch (error) {
    console.error("Upload thumbnail error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Course module management
router.post("/courses/:courseId/modules", requireAdmin as any, async (req: AuthRequest, res) => {
  try {
    const { courseId } = req.params;
    const moduleData = insertCourseModuleSchema.parse({
      ...req.body,
      course_id: courseId
    });
    
    const module = await storage.createCourseModule(moduleData);
    res.status(201).json({ module });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid input", details: error.errors });
    }
    console.error("Create module error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/courses/:courseId/modules", async (req, res) => {
  try {
    const { courseId } = req.params;
    const modules = await storage.getCourseModules(courseId);
    res.json({ modules });
  } catch (error) {
    console.error("Get modules error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Lesson management
router.post("/modules/:moduleId/lessons", requireAdmin as any, async (req: AuthRequest, res) => {
  try {
    const { moduleId } = req.params;
    const lessonData = insertLessonSchema.parse({
      ...req.body,
      module_id: moduleId
    });
    
    const lesson = await storage.createLesson(lessonData);
    res.status(201).json({ lesson });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid input", details: error.errors });
    }
    console.error("Create lesson error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Upload lesson video
router.post("/lessons/:lessonId/video", requireAdmin as any, uploadVideo, async (req: AuthRequest, res) => {
  try {
    const { lessonId } = req.params;
    
    if (!req.file) {
      return res.status(400).json({ error: "No video file uploaded" });
    }
    
    const videoUrl = getFileUrl(req, `videos/${req.file.filename}`);
    
    const lesson = await storage.updateLesson(lessonId, {
      video_url: videoUrl
    });
    
    res.json({ 
      lesson,
      video_url: videoUrl 
    });
  } catch (error) {
    console.error("Upload video error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Course materials management
router.post("/lessons/:lessonId/materials", requireAdmin as any, uploadMaterial, async (req: AuthRequest, res) => {
  try {
    const { lessonId } = req.params;
    
    if (!req.file) {
      return res.status(400).json({ error: "No material file uploaded" });
    }
    
    const fileUrl = getFileUrl(req, `materials/${req.file.filename}`);
    
    const materialData = {
      lesson_id: lessonId,
      title: req.body.title || req.file.originalname,
      file_url: fileUrl,
      file_type: req.file.mimetype,
      file_size: req.file.size,
      is_downloadable: req.body.is_downloadable !== "false"
    };
    
    const material = await storage.createCourseMaterial(materialData);
    res.status(201).json({ material });
  } catch (error) {
    console.error("Upload material error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/lessons/:lessonId/materials", async (req, res) => {
  try {
    const { lessonId } = req.params;
    const materials = await storage.getLessonMaterials(lessonId);
    res.json({ materials });
  } catch (error) {
    console.error("Get materials error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Course analytics
router.get("/courses/:courseId/analytics", async (req, res) => {
  try {
    const { courseId } = req.params;
    const analytics = await storage.getCourseAnalytics(courseId);
    res.json({ analytics });
  } catch (error) {
    console.error("Get course analytics error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;