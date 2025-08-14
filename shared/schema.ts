import { pgTable, text, serial, integer, boolean, timestamp, decimal, uuid, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  nome: text("nome"),
  password: text("password").notNull(),
  role: text("role", { enum: ["user", "admin", "analyst"] }).notNull().default("user"),
  avatar_url: text("avatar_url"),
  is_active: boolean("is_active").notNull().default(true),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const courses = pgTable("courses", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  instructor: text("instructor"),
  duration: integer("duration"), // em aulas
  price: decimal("price", { precision: 10, scale: 2 }),
  status: text("status").notNull().default("active"), // active, inactive, draft
  thumbnail_url: text("thumbnail_url"),
  category: text("category"),
  difficulty_level: text("difficulty_level", { enum: ["beginner", "intermediate", "advanced"] }).default("beginner"),
  requirements: text("requirements").array(),
  learning_outcomes: text("learning_outcomes").array(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const enrollments = pgTable("enrollments", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").notNull().references(() => users.id),
  course_id: uuid("course_id").notNull().references(() => courses.id),
  enrolled_at: timestamp("enrolled_at").defaultNow().notNull(),
  completed_at: timestamp("completed_at"),
  status: text("status").notNull().default("active"), // active, completed, paused
  progress_percentage: integer("progress_percentage").notNull().default(0),
  classes_attended: integer("classes_attended").notNull().default(0),
  current_grade: real("current_grade"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const assessments = pgTable("assessments", {
  id: uuid("id").primaryKey().defaultRandom(),
  course_id: uuid("course_id").notNull().references(() => courses.id),
  title: text("title").notNull(),
  type: text("type").notNull(), // prova, trabalho, exercicio
  max_score: real("max_score").notNull().default(10),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const user_assessments = pgTable("user_assessments", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").notNull().references(() => users.id),
  assessment_id: uuid("assessment_id").notNull().references(() => assessments.id),
  score: real("score"),
  status: text("status").notNull().default("pending"), // pending, completed, graded
  feedback: text("feedback"),
  submitted_at: timestamp("submitted_at"),
  graded_at: timestamp("graded_at"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const study_sessions = pgTable("study_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").notNull().references(() => users.id),
  course_id: uuid("course_id").notNull().references(() => courses.id),
  duration_minutes: integer("duration_minutes").notNull(),
  session_date: timestamp("session_date").defaultNow().notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const support_tickets = pgTable("support_tickets", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").references(() => users.id),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("open"),
  priority: text("priority").notNull().default("normal"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Course modules/lessons
export const course_modules = pgTable("course_modules", {
  id: uuid("id").primaryKey().defaultRandom(),
  course_id: uuid("course_id").notNull().references(() => courses.id),
  title: text("title").notNull(),
  description: text("description"),
  order: integer("order").notNull(),
  is_active: boolean("is_active").notNull().default(true),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Lessons within modules
export const lessons = pgTable("lessons", {
  id: uuid("id").primaryKey().defaultRandom(),
  module_id: uuid("module_id").notNull().references(() => course_modules.id),
  title: text("title").notNull(),
  description: text("description"),
  content: text("content"), // HTML content for text lessons
  video_url: text("video_url"),
  duration_minutes: integer("duration_minutes"),
  order: integer("order").notNull(),
  is_free: boolean("is_free").notNull().default(false),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Course materials (PDFs, images, etc.)
export const course_materials = pgTable("course_materials", {
  id: uuid("id").primaryKey().defaultRandom(),
  course_id: uuid("course_id").references(() => courses.id),
  lesson_id: uuid("lesson_id").references(() => lessons.id),
  title: text("title").notNull(),
  file_url: text("file_url").notNull(),
  file_type: text("file_type").notNull(), // pdf, image, document, etc.
  file_size: integer("file_size"), // in bytes
  is_downloadable: boolean("is_downloadable").notNull().default(true),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// User progress tracking
export const user_lesson_progress = pgTable("user_lesson_progress", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").notNull().references(() => users.id),
  lesson_id: uuid("lesson_id").notNull().references(() => lessons.id),
  completed: boolean("completed").notNull().default(false),
  progress_percentage: integer("progress_percentage").notNull().default(0),
  time_spent_minutes: integer("time_spent_minutes").notNull().default(0),
  last_accessed: timestamp("last_accessed").defaultNow().notNull(),
  completed_at: timestamp("completed_at"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  enrollments: many(enrollments),
  assessments: many(user_assessments),
  studySessions: many(study_sessions),
  supportTickets: many(support_tickets),
}));

export const coursesRelations = relations(courses, ({ many }) => ({
  enrollments: many(enrollments),
  assessments: many(assessments),
  studySessions: many(study_sessions),
  modules: many(course_modules),
  materials: many(course_materials),
}));

export const courseModulesRelations = relations(course_modules, ({ one, many }) => ({
  course: one(courses, { fields: [course_modules.course_id], references: [courses.id] }),
  lessons: many(lessons),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  module: one(course_modules, { fields: [lessons.module_id], references: [course_modules.id] }),
  materials: many(course_materials),
  userProgress: many(user_lesson_progress),
}));

export const courseMaterialsRelations = relations(course_materials, ({ one }) => ({
  course: one(courses, { fields: [course_materials.course_id], references: [courses.id] }),
  lesson: one(lessons, { fields: [course_materials.lesson_id], references: [lessons.id] }),
}));

export const userLessonProgressRelations = relations(user_lesson_progress, ({ one }) => ({
  user: one(users, { fields: [user_lesson_progress.user_id], references: [users.id] }),
  lesson: one(lessons, { fields: [user_lesson_progress.lesson_id], references: [lessons.id] }),
}));

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  user: one(users, { fields: [enrollments.user_id], references: [users.id] }),
  course: one(courses, { fields: [enrollments.course_id], references: [courses.id] }),
}));

export const assessmentsRelations = relations(assessments, ({ one, many }) => ({
  course: one(courses, { fields: [assessments.course_id], references: [courses.id] }),
  userAssessments: many(user_assessments),
}));

export const userAssessmentsRelations = relations(user_assessments, ({ one }) => ({
  user: one(users, { fields: [user_assessments.user_id], references: [users.id] }),
  assessment: one(assessments, { fields: [user_assessments.assessment_id], references: [assessments.id] }),
}));

export const studySessionsRelations = relations(study_sessions, ({ one }) => ({
  user: one(users, { fields: [study_sessions.user_id], references: [users.id] }),
  course: one(courses, { fields: [study_sessions.course_id], references: [courses.id] }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  created_at: true,
  updated_at: true,
}).extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const insertEnrollmentSchema = createInsertSchema(enrollments).omit({
  id: true,
  enrolled_at: true,
  created_at: true,
  updated_at: true,
});

export const insertAssessmentSchema = createInsertSchema(assessments).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const insertUserAssessmentSchema = createInsertSchema(user_assessments).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const insertStudySessionSchema = createInsertSchema(study_sessions).omit({
  id: true,
  created_at: true,
});

export const insertSupportTicketSchema = createInsertSchema(support_tickets).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const insertCourseModuleSchema = createInsertSchema(course_modules).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const insertLessonSchema = createInsertSchema(lessons).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const insertCourseMaterialSchema = createInsertSchema(course_materials).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const insertUserLessonProgressSchema = createInsertSchema(user_lesson_progress).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

// Login schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof courses.$inferSelect;
export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type Enrollment = typeof enrollments.$inferSelect;
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type Assessment = typeof assessments.$inferSelect;
export type InsertUserAssessment = z.infer<typeof insertUserAssessmentSchema>;
export type UserAssessment = typeof user_assessments.$inferSelect;
export type InsertStudySession = z.infer<typeof insertStudySessionSchema>;
export type StudySession = typeof study_sessions.$inferSelect;
export type InsertSupportTicket = z.infer<typeof insertSupportTicketSchema>;
export type SupportTicket = typeof support_tickets.$inferSelect;
export type CourseModule = typeof course_modules.$inferSelect;
export type InsertCourseModule = z.infer<typeof insertCourseModuleSchema>;
export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type CourseMaterial = typeof course_materials.$inferSelect;
export type InsertCourseMaterial = z.infer<typeof insertCourseMaterialSchema>;
export type UserLessonProgress = typeof user_lesson_progress.$inferSelect;
export type InsertUserLessonProgress = z.infer<typeof insertUserLessonProgressSchema>;
