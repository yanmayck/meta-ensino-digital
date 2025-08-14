import { 
  users, courses, support_tickets, enrollments, assessments, user_assessments, study_sessions,
  type User, type InsertUser, type Course, type InsertCourse, type SupportTicket, type InsertSupportTicket,
  type Enrollment, type InsertEnrollment, type Assessment, type InsertAssessment,
  type UserAssessment, type InsertUserAssessment, type StudySession, type InsertStudySession
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql, avg, sum, count, and } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<User>): Promise<User>;
  deleteUser(id: string): Promise<void>;
  
  // Course methods
  getCourse(id: string): Promise<Course | undefined>;
  getAllCourses(): Promise<Course[]>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  // Enrollment methods
  getUserEnrollments(userId: string): Promise<any[]>;
  enrollUserInCourse(userId: string, courseId: string): Promise<Enrollment>;
  getEnrollmentProgress(userId: string, courseId: string): Promise<any>;
  
  // Assessment methods
  getUserAssessments(userId: string): Promise<any[]>;
  getCourseAssessments(courseId: string): Promise<Assessment[]>;
  
  // Statistics methods
  getUserStats(userId: string): Promise<any>;
  getAdminStats(): Promise<any>;
  
  // Study session methods
  getUserStudySessions(userId: string): Promise<StudySession[]>;
  
  // Support ticket methods
  getSupportTicket(id: string): Promise<SupportTicket | undefined>;
  getSupportTicketsByUserId(userId: string): Promise<SupportTicket[]>;
  createSupportTicket(ticket: InsertSupportTicket): Promise<SupportTicket>;
  updateSupportTicket(id: string, ticket: Partial<SupportTicket>): Promise<SupportTicket>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private courses: Map<string, Course>;
  private supportTickets: Map<string, SupportTicket>;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.supportTickets = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = crypto.randomUUID();
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      created_at: now,
      updated_at: now,
      role: insertUser.role || "user",
      nome: insertUser.nome || null
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updateData: Partial<User>): Promise<User> {
    const user = this.users.get(id);
    if (!user) throw new Error('User not found');
    
    const updatedUser: User = {
      ...user,
      ...updateData,
      updated_at: new Date(),
    };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async deleteUser(id: string): Promise<void> {
    if (!this.users.has(id)) {
      throw new Error('User not found');
    }
    this.users.delete(id);
  }

  async getCourse(id: string): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = crypto.randomUUID();
    const now = new Date();
    const course: Course = { 
      ...insertCourse, 
      id, 
      created_at: now,
      updated_at: now,
      description: insertCourse.description || null,
      instructor: insertCourse.instructor || null,
      duration: insertCourse.duration || null,
      price: insertCourse.price || null,
      status: insertCourse.status || 'active'
    };
    this.courses.set(id, course);
    return course;
  }

  // Enrollment methods - stub implementations for MemStorage
  async getUserEnrollments(userId: string): Promise<any[]> {
    return [];
  }

  async enrollUserInCourse(userId: string, courseId: string): Promise<Enrollment> {
    const id = crypto.randomUUID();
    const now = new Date();
    const enrollment: Enrollment = {
      id,
      user_id: userId,
      course_id: courseId,
      status: 'active',
      progress_percentage: 0,
      classes_attended: 0,
      current_grade: null,
      enrolled_at: now,
      completed_at: null,
      created_at: now,
      updated_at: now,
    };
    return enrollment;
  }

  async getEnrollmentProgress(userId: string, courseId: string): Promise<any> {
    return null;
  }

  // Assessment methods - stub implementations for MemStorage
  async getUserAssessments(userId: string): Promise<any[]> {
    return [];
  }

  async getCourseAssessments(courseId: string): Promise<Assessment[]> {
    return [];
  }

  // Statistics methods - stub implementations for MemStorage
  async getUserStats(userId: string): Promise<any> {
    return {
      courses: { total: 0, completed: 0, active: 0, averageProgress: 0, averageGrade: 0 },
      study: { totalHours: 0, totalSessions: 0 },
      assessments: { total: 0, completed: 0, averageScore: 0 },
    };
  }

  async getAdminStats(): Promise<any> {
    return {
      totalUsers: this.users.size,
      totalCourses: this.courses.size,
      activeCourses: this.courses.size,
      openTickets: this.supportTickets.size,
      userRegistrations: [],
    };
  }

  // Study session methods - stub implementations for MemStorage
  async getUserStudySessions(userId: string): Promise<StudySession[]> {
    return [];
  }

  async getSupportTicket(id: string): Promise<SupportTicket | undefined> {
    return this.supportTickets.get(id);
  }

  async getSupportTicketsByUserId(userId: string): Promise<SupportTicket[]> {
    return Array.from(this.supportTickets.values()).filter(
      ticket => ticket.user_id === userId
    );
  }

  async createSupportTicket(insertTicket: InsertSupportTicket): Promise<SupportTicket> {
    const id = crypto.randomUUID();
    const now = new Date();
    const ticket: SupportTicket = { 
      ...insertTicket, 
      id, 
      created_at: now,
      updated_at: now,
      status: insertTicket.status || "open",
      priority: insertTicket.priority || "normal",
      user_id: insertTicket.user_id || null
    };
    this.supportTickets.set(id, ticket);
    return ticket;
  }

  async updateSupportTicket(id: string, updateData: Partial<SupportTicket>): Promise<SupportTicket> {
    const ticket = this.supportTickets.get(id);
    if (!ticket) throw new Error('Support ticket not found');
    
    const updatedTicket: SupportTicket = {
      ...ticket,
      ...updateData,
      updated_at: new Date(),
    };
    this.supportTickets.set(id, updatedTicket);
    return updatedTicket;
  }
}

// DatabaseStorage implementation
export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: string, updateData: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...updateData, updated_at: new Date() })
      .where(eq(users.id, id))
      .returning();
    if (!user) throw new Error('User not found');
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async deleteUser(id: string): Promise<void> {
    const result = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();
    if (result.length === 0) {
      throw new Error('User not found');
    }
  }

  async getCourse(id: string): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course || undefined;
  }

  async getAllCourses(): Promise<Course[]> {
    return await db.select().from(courses);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const [course] = await db
      .insert(courses)
      .values(insertCourse)
      .returning();
    return course;
  }

  async getSupportTicket(id: string): Promise<SupportTicket | undefined> {
    const [ticket] = await db.select().from(support_tickets).where(eq(support_tickets.id, id));
    return ticket || undefined;
  }

  async getSupportTicketsByUserId(userId: string): Promise<SupportTicket[]> {
    return await db.select().from(support_tickets).where(eq(support_tickets.user_id, userId));
  }

  async createSupportTicket(insertTicket: InsertSupportTicket): Promise<SupportTicket> {
    const [ticket] = await db
      .insert(support_tickets)
      .values(insertTicket)
      .returning();
    return ticket;
  }

  async updateSupportTicket(id: string, updateData: Partial<SupportTicket>): Promise<SupportTicket> {
    const [ticket] = await db
      .update(support_tickets)
      .set({ ...updateData, updated_at: new Date() })
      .where(eq(support_tickets.id, id))
      .returning();
    if (!ticket) throw new Error('Support ticket not found');
    return ticket;
  }

  // Enrollment methods
  async getUserEnrollments(userId: string): Promise<any[]> {
    return await db
      .select({
        id: courses.id,
        title: courses.title,
        description: courses.description,
        instructor: courses.instructor,
        duration: courses.duration,
        price: courses.price,
        status: enrollments.status,
        progress_percentage: enrollments.progress_percentage,
        classes_attended: enrollments.classes_attended,
        current_grade: enrollments.current_grade,
        enrolled_at: enrollments.enrolled_at,
        completed_at: enrollments.completed_at,
      })
      .from(enrollments)
      .innerJoin(courses, eq(enrollments.course_id, courses.id))
      .where(eq(enrollments.user_id, userId));
  }

  async enrollUserInCourse(userId: string, courseId: string): Promise<Enrollment> {
    const [enrollment] = await db
      .insert(enrollments)
      .values({ user_id: userId, course_id: courseId })
      .returning();
    return enrollment;
  }

  async getEnrollmentProgress(userId: string, courseId: string): Promise<any> {
    const [enrollment] = await db
      .select()
      .from(enrollments)
      .where(and(eq(enrollments.user_id, userId), eq(enrollments.course_id, courseId)));
    return enrollment;
  }

  // Assessment methods
  async getUserAssessments(userId: string): Promise<any[]> {
    return await db
      .select({
        id: user_assessments.id,
        title: assessments.title,
        type: assessments.type,
        course_title: courses.title,
        score: user_assessments.score,
        max_score: assessments.max_score,
        status: user_assessments.status,
        feedback: user_assessments.feedback,
        submitted_at: user_assessments.submitted_at,
        graded_at: user_assessments.graded_at,
      })
      .from(user_assessments)
      .innerJoin(assessments, eq(user_assessments.assessment_id, assessments.id))
      .innerJoin(courses, eq(assessments.course_id, courses.id))
      .where(eq(user_assessments.user_id, userId))
      .orderBy(desc(user_assessments.created_at));
  }

  async getCourseAssessments(courseId: string): Promise<Assessment[]> {
    return await db
      .select()
      .from(assessments)
      .where(eq(assessments.course_id, courseId));
  }

  // Statistics methods
  async getUserStats(userId: string): Promise<any> {
    // Get enrollment stats
    const [enrollmentStats] = await db
      .select({
        total_enrollments: count(enrollments.id),
        completed_courses: count(sql`CASE WHEN ${enrollments.status} = 'completed' THEN 1 END`),
        active_courses: count(sql`CASE WHEN ${enrollments.status} = 'active' THEN 1 END`),
        avg_progress: avg(enrollments.progress_percentage),
        avg_grade: avg(enrollments.current_grade),
      })
      .from(enrollments)
      .where(eq(enrollments.user_id, userId));

    // Get study hours
    const [studyStats] = await db
      .select({
        total_study_hours: sum(study_sessions.duration_minutes),
        total_sessions: count(study_sessions.id),
      })
      .from(study_sessions)
      .where(eq(study_sessions.user_id, userId));

    // Get assessment stats
    const [assessmentStats] = await db
      .select({
        total_assessments: count(user_assessments.id),
        completed_assessments: count(sql`CASE WHEN ${user_assessments.status} = 'graded' THEN 1 END`),
        avg_score: avg(user_assessments.score),
      })
      .from(user_assessments)
      .where(eq(user_assessments.user_id, userId));

    return {
      courses: {
        total: enrollmentStats?.total_enrollments || 0,
        completed: enrollmentStats?.completed_courses || 0,
        active: enrollmentStats?.active_courses || 0,
        averageProgress: Math.round(Number(enrollmentStats?.avg_progress) || 0),
        averageGrade: Number(enrollmentStats?.avg_grade) || 0,
      },
      study: {
        totalHours: Math.round((Number(studyStats?.total_study_hours) || 0) / 60),
        totalSessions: studyStats?.total_sessions || 0,
      },
      assessments: {
        total: assessmentStats?.total_assessments || 0,
        completed: assessmentStats?.completed_assessments || 0,
        averageScore: Number(assessmentStats?.avg_score) || 0,
      },
    };
  }

  async getAdminStats(): Promise<any> {
    const [userStats] = await db
      .select({
        total_users: count(users.id),
      })
      .from(users);

    const [courseStats] = await db
      .select({
        total_courses: count(courses.id),
        active_courses: count(sql`CASE WHEN ${courses.status} = 'active' THEN 1 END`),
      })
      .from(courses);

    const [ticketStats] = await db
      .select({
        open_tickets: count(sql`CASE WHEN ${support_tickets.status} = 'open' THEN 1 END`),
      })
      .from(support_tickets);

    // User registrations in last 7 days
    const userRegistrations = await db
      .select({
        date: sql<string>`DATE(${users.created_at})`,
        count: count(users.id),
      })
      .from(users)
      .where(sql`${users.created_at} >= NOW() - INTERVAL '7 days'`)
      .groupBy(sql`DATE(${users.created_at})`)
      .orderBy(sql`DATE(${users.created_at})`);

    return {
      totalUsers: userStats?.total_users || 0,
      totalCourses: courseStats?.total_courses || 0,
      activeCourses: courseStats?.active_courses || 0,
      openTickets: ticketStats?.open_tickets || 0,
      userRegistrations: userRegistrations.map(reg => ({
        date: reg.date,
        count: reg.count,
      })),
    };
  }

  // Study session methods
  async getUserStudySessions(userId: string): Promise<StudySession[]> {
    return await db
      .select()
      .from(study_sessions)
      .where(eq(study_sessions.user_id, userId))
      .orderBy(desc(study_sessions.session_date));
  }
}

export const storage = new DatabaseStorage();
