import { pgTable, text, serial, integer, boolean, timestamp, decimal, uuid, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  nome: text("nome"),
  role: text("role", { enum: ["user", "admin", "analyst"] }).notNull().default("user"),
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
  status: text("status").notNull().default("active"), // active, inactive
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
