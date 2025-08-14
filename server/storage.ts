import { users, courses, support_tickets, type User, type InsertUser, type Course, type InsertCourse, type SupportTicket, type InsertSupportTicket } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

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
      price: insertCourse.price || null
    };
    this.courses.set(id, course);
    return course;
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
}

export const storage = new DatabaseStorage();
