#!/bin/bash

# Car Rental App Setup Script

echo "🚗 Setting up Car Rental App..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v18 or higher) and try again."
    exit 1
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not available. Please install npm and try again."
    exit 1
fi

echo "✅ Node.js and npm are available"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Copy backend environment file
if [ ! -f .env ]; then
    cp .env.example .env
    echo "📄 Created backend .env file from example"
    echo "⚠️  Please edit backend/.env and configure your PostgreSQL database URL"
else
    echo "📄 Backend .env file already exists"
fi

# Go back to root
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install

# Copy frontend environment file
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "📄 Created frontend .env.local file from example"
    echo "⚠️  Please edit frontend/.env.local and configure your environment variables"
else
    echo "📄 Frontend .env.local file already exists"
fi

# Go back to root
cd ..

echo ""
echo "🎉 Setup completed!"
echo ""
echo "Next steps:"
echo "1. Configure your PostgreSQL database URL in backend/.env"
echo "2. Configure your environment variables in frontend/.env.local"
echo "3. Run database migrations: cd backend && npx prisma migrate dev --name init"
echo "4. Generate Prisma client: cd backend && npx prisma generate"
echo "5. Start the development servers: npm run dev"
echo ""
echo "Happy coding! 🚀"
