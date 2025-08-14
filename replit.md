# replit.md

## Overview

This is a full-stack educational platform called "Meta Educação" designed for adult education completion (high school equivalent). The application is built using React with TypeScript on the frontend, Express.js on the backend, and PostgreSQL with Drizzle ORM for data management. The platform provides online learning capabilities with features like course management, user progress tracking, payment processing, and administrative tools.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom theme variables and responsive design
- **Routing**: Wouter for client-side routing with protected routes for authenticated users
- **State Management**: React Query (@tanstack/react-query) for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Authentication**: Custom hook-based authentication system with JWT-like session management

### Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Connection**: Neon serverless database connection with connection pooling
- **API Design**: RESTful API structure with organized route handlers
- **Session Management**: In-memory storage with abstracted storage interface for future database integration
- **Development**: Hot reload with Vite middleware integration

### Database Schema
The system uses three main entities:
- **Users**: Authentication and role-based access (user, admin, analyst roles)
- **Courses**: Educational content management with pricing and instructor information
- **Support Tickets**: Customer support system with priority and status tracking

### Authentication & Authorization
- **Role-based Access**: Three user roles (user, admin, analyst) with different permission levels
- **Protected Routes**: Client-side route protection with authentication guards
- **Session Persistence**: Local storage-based session management
- **Password Security**: Client-side password validation with complexity requirements

### File Structure
- `client/`: React frontend application with component-based architecture
- `server/`: Express.js backend with organized routes and storage abstraction
- `shared/`: Common schemas and types shared between frontend and backend
- Component organization follows atomic design principles with clear separation of concerns

## External Dependencies

### Database & ORM
- **Neon Database**: Serverless PostgreSQL hosting with @neondatabase/serverless driver
- **Drizzle ORM**: Type-safe ORM with schema-first approach and migration support
- **Connection Pooling**: Built-in connection management for scalable database access

### UI & Styling
- **Radix UI**: Comprehensive component library for accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Modern icon library for consistent iconography
- **Custom Fonts**: Google Fonts integration (Inter and Lexend families)

### Development Tools
- **TypeScript**: Full type safety across the entire application stack
- **Vite**: Fast build tool with hot module replacement and optimized production builds
- **ESBuild**: Fast bundling for server-side code in production
- **Replit Integration**: Development environment integration with error handling and cartographer

### Third-party Services
- **Form Validation**: Zod for runtime type checking and form validation
- **Date Handling**: date-fns for consistent date manipulation across the application

## Migration Notes
- **Date**: January 14, 2025
- **Migration**: Successfully migrated from Supabase to Neon PostgreSQL with JWT authentication
- **Latest Changes** (August 14, 2025):
  - **JWT Authentication System**: Complete implementation with bcryptjs password hashing
  - **File Upload System**: Multer-based uploads for videos, course materials, avatars, and thumbnails
  - **Expanded Database Schema**: Added course_modules, lessons, course_materials, and user_lesson_progress tables
  - **Admin Panel Features**: Full course management with module and lesson creation
  - **Authentication Middleware**: Role-based access control (user, admin, analyst)
  - **File Serving**: Static file serving for uploaded content
  - **Course Analytics**: Real-time analytics for course performance and student engagement
  - **Password Migration**: Successfully migrated existing users with secure password hashing
  - **API Routes**: Modular route architecture with separate auth.ts and admin.ts files

## Security Features
- **JWT Token Authentication**: 7-day expiration with refresh capability
- **Password Hashing**: BCrypt with 12 salt rounds
- **Role-based Authorization**: Admin, analyst, and user role separation
- **File Upload Validation**: Type checking and size limits for uploads
- **Protected Routes**: Authentication middleware for sensitive endpoints

The application is now ready for local VS Code development with comprehensive educational platform features including video uploads, course materials, and real-time progress tracking.