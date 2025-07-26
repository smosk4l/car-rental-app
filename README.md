# 🚗 Car Rental Web Application

A modern, full-stack car rental application built with Next.js, TypeScript, and Express.js.

## 📋 Project Status

**✅ FULLY CONFIGURED & READY FOR DEVELOPMENT**

- ✅ Complete project structure with backend/frontend separation
- ✅ Database configured and seeded with sample data
- ✅ TypeScript compilation errors resolved
- ✅ ESLint configuration working perfectly
- ✅ NextAuth.js authentication system configured
- ✅ API endpoints implemented and documented
- ✅ Professional configuration management (no magic strings)
- ✅ All dependencies installed and compatible

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Styled Components** with SSR support
- **NextAuth.js** for authentication (JWT strategy)
- **Axios** for API communication

### Backend  
- **Express.js** with TypeScript
- **Prisma** ORM with PostgreSQL
- **JWT** authentication with bcryptjs
- **Zod** for validation
- **CORS** configured for frontend integration

### Database
- **PostgreSQL** (running in Docker on port 5433)
- **Prisma** for database management
- Pre-configured with Users, Cars, and Reservations models

## 📁 Project Structure

```
car-rental-app/
├── frontend/                    # Next.js frontend application
│   ├── src/
│   │   ├── app/                # Next.js App Router pages
│   │   ├── components/         # Reusable React components
│   │   │   ├── Button/         # Button component (Button.tsx + styles.ts)
│   │   │   ├── Input/          # Input component (Input.tsx + styles.ts)
│   │   │   ├── LoginForm/      # LoginForm component (LoginForm.tsx + styles.ts)
│   │   │   ├── Header/         # Header component (Header.tsx + styles.ts)
│   │   │   └── ...             # Each component has own folder structure
│   │   ├── lib/                # Utility libraries and configurations
│   │   ├── styles/             # Styled Components themes
│   │   └── types/              # TypeScript type definitions
│   ├── .env.example            # Frontend environment template
│   └── package.json            # Frontend dependencies
├── backend/                     # Express.js backend API
│   ├── src/
│   │   ├── config/             # Configuration and constants
│   │   ├── controllers/        # Request handlers
│   │   ├── middleware/         # Express middleware
│   │   ├── routes/             # API route definitions
│   │   ├── utils/              # Utility functions
│   │   └── types/              # TypeScript type definitions
│   ├── prisma/                 # Database schema and migrations
│   ├── .env.example            # Backend environment template
│   └── package.json            # Backend dependencies
├── docker-compose.yml          # PostgreSQL database setup
├── COPILOT_INSTRUCTIONS.md     # Developer guidelines
├── API.md                      # API documentation
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ (run `nvm use 20` in each terminal)
- Docker and Docker Compose
- npm (comes with Node.js)

### 1. Clone and Install
```bash
git clone <repository-url>
cd car-rental-app

# Install all dependencies
npm run install:all
```

### 2. Start Database
```bash
# Start PostgreSQL in Docker (port 5433 to avoid conflicts)
docker-compose up -d
```

### 3. Setup Environment Files
```bash
# Backend environment
cd backend
cp .env.example .env
# Edit .env and add:
# JWT_SECRET="your-jwt-secret-here"
# DATABASE_URL="postgresql://postgres:password@localhost:5433/car_rental_db?schema=public"

# Frontend environment  
cd ../frontend
cp .env.example .env.local
# Edit .env.local if needed (defaults should work)
```

### 4. Initialize Database
```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
npm run seed  # Adds sample users and cars
```

### 5. Start Development Servers
```bash
# From root directory - starts both frontend and backend
npm run dev

# Or start individually:
# Backend: cd backend && npm run dev
# Frontend: cd frontend && npm run dev
```

### 6. Access Applications
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **API Health Check**: http://localhost:5001/api/health

## 🧪 Test Credentials

After running the seed script, you can test with:
- **Admin**: `admin@example.com` / `admin123`
- **User**: `user@example.com` / `user123`

## 🔐 Authentication Features

### Login Form
- **URL**: http://localhost:3000/auth/login
- **Features**: 
  - Email and password validation
  - Loading states and error handling
  - Responsive design with styled components
  - Integration with NextAuth.js
  
### Navigation
- **Header component** shows login status
- **Sign In/Sign Out** buttons
- **User role display** (USER/ADMIN)
- **Automatic redirect** after login/logout

## 📊 Database Information

- **Host**: localhost:5433 (Docker container)
- **Database**: car_rental_db
- **Username**: postgres
- **Password**: password

### Database Models
- **Users**: Authentication and user management
- **Cars**: Car inventory with pricing and availability
- **Reservations**: Booking system with status tracking

## 🔧 Available Scripts

### Root Directory
```bash
npm run dev           # Start both frontend and backend
npm run install:all   # Install all dependencies
npm run lint:all      # Lint both projects
```

### Backend (`cd backend`)
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
npm run type-check   # Check TypeScript types
npm run lint:strict  # Run both linting and type checking
npm run pre-commit   # Quality assurance before commits
npm run seed         # Seed database with sample data
```

### Frontend (`cd frontend`)
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
npm run type-check   # Check TypeScript types
npm run lint:strict  # Run both linting and type checking
npm run pre-commit   # Quality assurance before commits
```

## 🔍 Key Configuration Features

### 1. **Type Safety**
- Strict TypeScript configuration
- Proper type definitions for NextAuth and Styled Components
- Zero TypeScript compilation errors

### 2. **Professional Configuration Management**
- Centralized configuration in `backend/src/config/`
- No magic strings or numbers
- Environment variable validation
- Type-safe configuration objects

### 3. **Database Integration**
- Prisma ORM with full TypeScript support
- Automated migrations and seeding
- Production-ready schema design

### 4. **Authentication System**
- NextAuth.js with JWT strategy
- Custom user roles and session management
- Protected API routes with middleware

### 5. **Component Architecture**
- Folder-based component structure
- Separation of logic (ComponentName.tsx) and styles (styles.ts)
- Clean imports with index files
- TypeScript support throughout
- Reusable and maintainable components

### 6. **Code Quality Assurance**
- Strict TypeScript configuration with no compilation errors
- ESLint rules enforced across the codebase
- Single Responsibility Principle (SRP) implementation
- Pre-commit quality checks with `npm run pre-commit`
- Comprehensive type safety and error handling

## 📚 Documentation

- **API Documentation**: See `API.md`
- **Authentication Guide**: See `AUTHENTICATION_GUIDE.md`
- **Component Architecture**: See `COMPONENT_ARCHITECTURE.md`
- **Developer Guidelines**: See `COPILOT_INSTRUCTIONS.md`
- **Project History**: All major configurations and fixes have been applied

## 🔒 Environment Variables

### Backend Required
```bash
JWT_SECRET="your-jwt-secret-here"
DATABASE_URL="postgresql://postgres:password@localhost:5433/car_rental_db?schema=public"
```

### Backend Optional
```bash
PORT=5001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
JWT_EXPIRES_IN=7d
```

### Frontend Optional
```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET="your-nextauth-secret"
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

## 🚨 Important Notes

1. **Port Configuration**: Backend runs on port 5001 (not 5000) to avoid conflicts
2. **Database Port**: PostgreSQL runs on port 5433 (not 5432) to avoid conflicts  
3. **Node.js Version**: Always use Node.js 20 (`nvm use 20`)
4. **TypeScript**: All compilation errors have been resolved
5. **ESLint**: Configuration is working properly with no warnings

## 🛠️ Troubleshooting

### Common Issues
1. **Port conflicts**: Make sure ports 3000, 5001, and 5433 are available
2. **Node.js version**: Use `nvm use 20` before running commands
3. **Database connection**: Ensure Docker container is running
4. **Environment variables**: Check `.env` files are properly configured

### Database Reset
```bash
cd backend
npx prisma migrate reset --force
npm run seed
```

## 📈 Next Steps for Development

### Authentication System ✅ COMPLETED
- ✅ Login form with email/password validation
- ✅ NextAuth.js integration with JWT strategy
- ✅ Session management and user roles
- ✅ Protected routes and authentication middleware
- ✅ Header navigation with login status

### Upcoming Features
1. **Frontend UI**: Build out React components for car listing, booking, and user management
2. **File Uploads**: Add car image upload functionality
3. **Search & Filtering**: Implement car search and filtering features
4. **Payment Integration**: Add payment processing (Stripe, PayPal)
5. **Admin Dashboard**: Create admin interface for managing cars and bookings
6. **Testing**: Add unit and integration tests
7. **Deployment**: Configure for production deployment

---

**Project Status**: ✅ Ready for active development  
**Last Updated**: July 2025  
**Configuration Status**: Complete and fully functional
