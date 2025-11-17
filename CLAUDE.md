# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Quick Start
```bash
# Install all dependencies
npm run install:all

# Start development servers (frontend & backend)
npm run dev

# Run quality checks before committing
npm run quality-check
```

### Backend Development (Express API - Port 5001)
```bash
cd backend

# Development with hot reload
npm run dev

# Database operations
npm run prisma:generate  # Generate Prisma client after schema changes
npm run prisma:migrate   # Apply database migrations
npm run seed            # Seed database with test data

# Code quality
npm run lint            # Run ESLint
npm run type-check      # Check TypeScript compilation
npm run build           # Build for production
```

### Frontend Development (Next.js - Port 3000)
```bash
cd frontend

# Development server
npm run dev

# Code quality
npm run lint            # Run ESLint with Next.js config
npm run type-check      # Check TypeScript compilation
npm run build           # Production build
```

### Database Management
```bash
# Start PostgreSQL (port 5433)
docker-compose up -d

# Access database
docker exec -it car-rental-app-postgres-1 psql -U postgres -d car_rental_db
```

## Architecture Overview

### Technology Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Styled Components, NextAuth.js
- **Backend**: Express.js, TypeScript, Prisma ORM, JWT authentication
- **Database**: PostgreSQL (Docker, port 5433)

### Project Structure
```
frontend/
├── src/app/          # Next.js App Router pages
├── src/components/   # Reusable components (each in its own folder)
├── src/lib/          # Utilities, API client, auth configuration
└── src/styles/       # Styled Components theme

backend/
├── src/controllers/  # Request handlers
├── src/middleware/   # Auth and error handling
├── src/routes/       # API endpoint definitions
└── prisma/          # Database schema and migrations
```

### Component Structure Pattern
Components follow this structure:
```
ComponentName/
├── index.tsx         # Component logic
├── styles.ts         # Styled Components
└── types.ts          # TypeScript interfaces (if needed)
```

### API Architecture
- RESTful endpoints with JWT authentication
- Zod validation for request/response schemas
- Role-based access control (USER/ADMIN)
- Protected routes require Bearer token

### Authentication Flow
1. Frontend: NextAuth.js with custom JWT strategy
2. Backend: JWT validation middleware
3. Database: User model with bcrypt password hashing
4. Sessions stored in JWT tokens (no server sessions)

### Key Configuration Files
- `frontend/.env.local`: NextAuth secrets, API URL
- `backend/.env`: Database URL, JWT secrets
- `frontend/src/lib/api.ts`: Axios instance with auth interceptor
- `backend/src/middleware/auth.ts`: JWT validation middleware

### Testing Approach
While no test framework is currently configured, the codebase is structured for testing:
- Use Jest (included with Next.js) for frontend tests
- Add Jest/Vitest for backend unit tests
- Test database operations with Prisma's testing utilities

### Development Workflow
1. Always run `npm run quality-check` before committing
2. Database schema changes require `npm run prisma:migrate`
3. Environment variables are required for both frontend and backend
4. Use the provided seed data for testing (admin@example.com / admin123)