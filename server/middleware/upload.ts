import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const videosDir = path.join(uploadDir, "videos");
const materialsDir = path.join(uploadDir, "materials");
const avatarsDir = path.join(uploadDir, "avatars");
const thumbnailsDir = path.join(uploadDir, "thumbnails");

[videosDir, materialsDir, avatarsDir, thumbnailsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = uploadDir;
    
    if (file.fieldname === "video") {
      uploadPath = videosDir;
    } else if (file.fieldname === "material") {
      uploadPath = materialsDir;
    } else if (file.fieldname === "avatar") {
      uploadPath = avatarsDir;
    } else if (file.fieldname === "thumbnail") {
      uploadPath = thumbnailsDir;
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.fieldname === "video") {
    // Accept video files
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Only video files are allowed for video uploads!"), false);
    }
  } else if (file.fieldname === "material") {
    // Accept documents and images
    const allowedMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "image/jpeg",
      "image/png",
      "image/gif",
      "text/plain"
    ];
    
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("File type not allowed for materials!"), false);
    }
  } else if (file.fieldname === "avatar" || file.fieldname === "thumbnail") {
    // Accept only images
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  } else {
    cb(new Error("Unknown field name!"), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
});

// Specific upload configurations
export const uploadVideo = upload.single("video");
export const uploadMaterial = upload.single("material");
export const uploadAvatar = upload.single("avatar");
export const uploadThumbnail = upload.single("thumbnail");
export const uploadMultiple = upload.fields([
  { name: "video", maxCount: 1 },
  { name: "materials", maxCount: 10 },
  { name: "thumbnail", maxCount: 1 }
]);

export function getFileUrl(req: any, filename: string): string {
  return `${req.protocol}://${req.get("host")}/uploads/${filename}`;
}