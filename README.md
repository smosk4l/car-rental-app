# Car Rental Web Application

A full-stack TypeScript car ren4. **Setup Back5. **Setup Frontend En7. **Start D8. **Access the applications**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001
   - API Health Check: http://localhost:5001/api/healthopment Servers**
   ```bash
   # From the root directory, this will start both frontend and backend
   npm run dev
   ```

8. **Access the applications**nt**
   ```bash
   cd frontend
   cp .env.example .env.local
   # Edit .env.local file and configure your environment variables
   ```

6. **Initialize Database** (from backend directory)ronment**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env file and configure your PostgreSQL database URL
   # For Docker setup, use: DATABASE_URL="postgresql://postgres:password@localhost:5433/car_rental_db?schema=public"
   ```

5. **Setup Frontend Environment**ication built with Next.js frontend and Express.js backend.

## Project Structure

```
car-rental-app/
├── frontend/          # Next.js frontend application
├── backend/           # Express.js backend API
└── README.md         # This file
```

## Tech Stack

### Frontend
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Styled Components (with SSR support)
- **Authentication**: NextAuth.js (JWT strategy)
- **HTTP Client**: Axios

### Backend
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Validation**: Zod
- **Authentication**: JWT with bcryptjs

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database (or Docker for easy setup)
- npm (package manager)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd car-rental-app
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Setup Database** (Choose one option)
   
   **Option A: Using Docker (Recommended)**
   ```bash
   docker-compose up -d  # Starts PostgreSQL in the background
   ```
   
   **Option B: Using Local PostgreSQL**
   - Install PostgreSQL locally
   - Create a database named `car_rental_db`

4. **Setup Backend Environment**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env file and configure your PostgreSQL database URL
   ```

4. **Setup Frontend Environment**
   ```bash
   cd frontend
   cp .env.example .env.local
   # Edit .env.local file and configure your environment variables
   ```

6. **Initialize Database** (from backend directory)
   ```bash
   cd backend
   npx prisma migrate dev --name init
   npx prisma generate
   npm run seed  # Optional: seed with sample data
   ```

7. **Start Development Servers**
   ```bash
   # From the root directory, this will start both frontend and backend
   npm run dev
   ```

7. **Access the applications**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Health Check: http://localhost:5000/api/health

### Manual Setup (Alternative)

If you prefer to set up each part manually:

#### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure your PostgreSQL database URL in .env
npx prisma migrate dev --name init
npx prisma generate
npm run seed  # Optional: seed with sample data
npm run dev
```

#### Frontend Setup (in a new terminal)
```bash
cd frontend
npm install
cp .env.example .env.local
# Configure your environment variables in .env.local
npm run dev
```

## Development Commands

### Root Level Commands
- `npm run install:all` - Install dependencies for both frontend and backend
- `npm run dev` - Start both frontend and backend development servers
- `npm run build` - Build both frontend and backend for production
- `npm run start` - Start both frontend and backend production servers

### Frontend Commands (from `frontend/` directory)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Lint the codebase

### Backend Commands (from `backend/` directory)
- `npm run dev` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run lint` - Lint the codebase
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run seed` - Seed database with sample data

## Environment Variables

Check the `.env.example` files in both `frontend/` and `backend/` directories for required environment variables.

## Features

- User authentication and authorization
- Car listing and search
- Rental booking system
- User dashboard
- Admin panel for car management
- Responsive design

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
