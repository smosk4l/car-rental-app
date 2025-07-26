# COPILOT_INSTRUCTIONS.md

## 🎯 Project Overview

This is a full-stack TypeScript car rental web application with modern architecture and best practices. Follow these instructions when contributing to maintain code quality, consistency, and scalability.

## 📋 **CURRENT PROJECT STATUS (July 2025)**

**✅ PROJECT IS FULLY CONFIGURED AND READY FOR ACTIVE DEVELOPMENT**

### Recent Accomplishments
- ✅ **Complete Setup**: Full-stack application structure implemented
- ✅ **Database**: PostgreSQL running in Docker (port 5433) with seeded data
- ✅ **TypeScript**: All compilation errors resolved, strict typing enforced
- ✅ **ESLint**: Configuration fixed and working perfectly (0 errors/warnings)
- ✅ **NextAuth**: Authentication system properly configured for App Router
- ✅ **Styled Components**: Theme system with proper TypeScript integration
- ✅ **Configuration**: Professional centralized config system (no magic strings)
- ✅ **API**: All endpoints implemented and documented
- ✅ **Environment**: All environment files and examples configured

### What Works Right Now
1. **Backend API**: Express server on port 5001 with JWT authentication
2. **Database**: Prisma ORM with Users/Cars/Reservations models + sample data
3. **Frontend**: Next.js 14 with TypeScript, Styled Components, and NextAuth
4. **Authentication**: Login/register endpoints with bcryptjs password hashing
5. **Type Safety**: Complete TypeScript coverage with zero compilation errors
6. **Linting**: ESLint properly configured for both frontend and backend

### Ready for Development
- **User Interface**: Build React components for car browsing and booking
- **Business Logic**: Implement reservation system and payment processing
- **Admin Features**: Create admin dashboard for car/user management
- **Testing**: Add unit and integration tests
- **Deployment**: Configure for production environment

## 📁 Project Structure

```
car-rental-app/
├── frontend/          # Next.js frontend application
│   ├── src/
│   │   ├── app/       # Next.js App Router pages
│   │   ├── components/# Reusable React components
│   │   ├── lib/       # Utility libraries and configurations
│   │   ├── styles/    # Styled Components themes and globals
│   │   └── types/     # TypeScript type definitions
│   ├── .env.example   # Frontend environment template
│   └── package.json   # Frontend dependencies
├── backend/           # Express.js backend API
│   ├── src/
│   │   ├── config/    # Configuration and constants
│   │   ├── controllers/# Request handlers
│   │   ├── middleware/# Express middleware
│   │   ├── routes/    # API route definitions
│   │   ├── utils/     # Utility functions
│   │   └── types/     # TypeScript type definitions
│   ├── prisma/        # Database schema and migrations
│   ├── .env.example   # Backend environment template
│   └── package.json   # Backend dependencies
├── docker-compose.yml # PostgreSQL database setup
├── package.json       # Root package with convenience scripts
└── README.md          # Project documentation
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Styled Components with SSR support
- **Authentication**: NextAuth.js (JWT strategy)
- **HTTP Client**: Axios with interceptors
- **State Management**: React hooks and context (add Zustand/Redux if needed)

### Backend
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Validation**: Zod schemas
- **Authentication**: JWT with bcryptjs
- **API Documentation**: Consider adding OpenAPI/Swagger

### Development Tools
- **Package Manager**: npm (exclusively)
- **Code Quality**: ESLint + Prettier
- **Type Checking**: TypeScript strict mode
- **Database**: Docker Compose for PostgreSQL

## 🚀 Development Setup

### Prerequisites
```bash
# Always use Node.js 20 when opening new terminals
nvm use 20

# Verify versions
node --version  # Should be v20.x.x
npm --version   # Should be 10.x.x
```

### Quick Start
```bash
# 1. Install all dependencies
npm run install:all

# 2. Start database
docker-compose up -d

# 3. Setup environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# 4. Configure database and run migrations
cd backend
npx prisma migrate dev --name init
npx prisma generate
npm run seed  # Optional: add sample data

# 5. Start development servers
cd ..
npm run dev  # Starts both frontend and backend
```

## 📝 Code Quality Standards

### 🎯 General Principles

1. **No Magic Numbers/Strings**
   ```typescript
   // ❌ Bad
   const PORT = process.env.PORT || 5001;
   setTimeout(callback, 5000);
   
   // ✅ Good
   const { port } = serverConfig;
   setTimeout(callback, TIMEOUTS.API_REQUEST);
   ```

2. **Use Constants and Enums**
   ```typescript
   // Create constants file for each feature
   export const API_ENDPOINTS = {
     CARS: '/api/cars',
     AUTH: '/api/auth',
   } as const;
   
   export enum UserRole {
     USER = 'USER',
     ADMIN = 'ADMIN',
   }
   ```

3. **DRY Principle - Don't Repeat Yourself**
   ```typescript
   // ❌ Bad - Duplicated validation logic
   
   // ✅ Good - Reusable validation schemas
   export const createCarSchema = z.object({
     make: z.string().min(1),
     model: z.string().min(1),
     // ...
   });
   ```

### 🔧 TypeScript Best Practices

1. **Strict Type Safety**
   ```typescript
   // Always define interfaces for data structures
   interface ApiResponse<T> {
     data: T;
     message: string;
     success: boolean;
   }
   
   // Use generic types for reusability
   type DatabaseEntity = {
     id: string;
     createdAt: Date;
     updatedAt: Date;
   };
   ```

2. **Type Guards and Validation**
   ```typescript
   // Use Zod for runtime validation
   const userSchema = z.object({
     email: z.string().email(),
     role: z.enum(['USER', 'ADMIN']),
   });
   
   type User = z.infer<typeof userSchema>;
   ```

3. **Proper Error Handling**
   ```typescript
   // ✅ Always handle errors in async functions
   async function fetchUserData(id: string): Promise<User | null> {
     try {
       const user = await prisma.user.findUnique({ where: { id } });
       return user;
     } catch (error) {
       logger.error('Failed to fetch user:', error);
       throw new Error('User fetch failed');
     }
   }
   ```

### 🎨 Frontend Standards

1. **Component Structure**
   ```typescript
   // Use consistent component patterns
   interface ButtonProps {
     variant?: 'primary' | 'secondary';
     size?: 'sm' | 'md' | 'lg';
     children: React.ReactNode;
     onClick?: () => void;
   }
   
   export const Button: React.FC<ButtonProps> = ({
     variant = 'primary',
     size = 'md',
     children,
     ...props
   }) => {
     return <StyledButton variant={variant} size={size} {...props}>{children}</StyledButton>;
   };
   ```

2. **Styled Components Best Practices**
   ```typescript
   // Use theme-based styling
   const StyledButton = styled.button<ButtonProps>`
     padding: ${({ theme, size }) => theme.spacing[size]};
     background-color: ${({ theme, variant }) => theme.colors[variant]};
     border-radius: ${({ theme }) => theme.borderRadius.md};
     
     // Use consistent naming for variants
     ${({ variant }) => variant === 'primary' && css`
       box-shadow: ${({ theme }) => theme.shadows.md};
     `}
   `;
   ```

3. **API Integration**
   ```typescript
   // Use consistent API service pattern
   export const carService = {
     async getAll(params?: CarFilters): Promise<CarsResponse> {
       const response = await api.get<CarsResponse>('/cars', { params });
       return response.data;
     },
     
     async getById(id: string): Promise<Car> {
       const response = await api.get<Car>(`/cars/${id}`);
       return response.data;
     },
   };
   ```

### 🗄️ Backend Standards

1. **Controller Pattern**
   ```typescript
   // Keep controllers thin, move logic to services
   export const getCarById = async (req: Request, res: Response): Promise<void> => {
     try {
       const { id } = getCarByIdSchema.parse(req.params);
       const car = await carService.findById(id);
       
       if (!car) {
         res.status(404).json({ error: 'Car not found' });
         return;
       }
       
       res.json(car);
     } catch (error) {
       handleControllerError(error, res);
     }
   };
   ```

2. **Service Layer**
   ```typescript
   // Business logic in services
   export const carService = {
     async findById(id: string): Promise<Car | null> {
       return prisma.car.findUnique({
         where: { id },
         include: { reservations: true },
       });
     },
     
     async create(data: CreateCarData): Promise<Car> {
       return prisma.car.create({ data });
     },
   };
   ```

3. **Middleware Pattern**
   ```typescript
   // Reusable middleware
   export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
     try {
       const token = extractTokenFromHeader(req.headers.authorization);
       const user = verifyToken(token);
       req.user = user;
       next();
     } catch (error) {
       res.status(401).json({ error: 'Authentication failed' });
     }
   };
   ```

## 📦 Package Management

### NPM Scripts Standards
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build", 
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit"
  }
}
```

### Dependency Management
- **Production Dependencies**: Only runtime requirements
- **Dev Dependencies**: Build tools, linters, type definitions
- **Exact Versions**: Consider using exact versions for critical packages
- **Security**: Regularly run `npm audit` and update dependencies

## 🗃️ Database & API Standards

### Database Patterns
```typescript
// Use consistent Prisma patterns
export const getUserWithReservations = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      reservations: {
        include: { car: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  });
};
```

### API Response Format
```typescript
// Consistent API response structure
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

### Error Handling
```typescript
// Centralized error handling
export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

// Usage
throw new AppError(404, 'Car not found');
```

## 🔒 Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use strong, unique secrets in production
   - Validate required environment variables on startup

2. **Authentication & Authorization**
   - Use secure JWT practices
   - Implement proper CORS configuration
   - Validate all inputs with Zod schemas

3. **Database Security**
   - Use parameterized queries (Prisma handles this)
   - Implement proper access controls
   - Regular security audits

## 🧪 Testing Standards

### Unit Tests
```typescript
// Test business logic and utilities
describe('carService', () => {
  test('should find car by ID', async () => {
    const mockCar = { id: '1', make: 'Toyota', model: 'Camry' };
    jest.spyOn(prisma.car, 'findUnique').mockResolvedValue(mockCar);
    
    const result = await carService.findById('1');
    expect(result).toEqual(mockCar);
  });
});
```

### Integration Tests
```typescript
// Test API endpoints
describe('GET /api/cars/:id', () => {
  test('should return car when found', async () => {
    const response = await request(app)
      .get('/api/cars/1')
      .expect(200);
      
    expect(response.body.data).toHaveProperty('id', '1');
  });
});
```

## 📚 Documentation Standards

1. **Code Comments**
   ```typescript
   /**
    * Calculates the total cost for a car reservation
    * @param startDate - Reservation start date
    * @param endDate - Reservation end date  
    * @param pricePerDay - Daily rental price
    * @returns Total cost including taxes and fees
    */
   export const calculateReservationCost = (
     startDate: Date,
     endDate: Date, 
     pricePerDay: number
   ): number => {
     // Implementation...
   };
   ```

2. **API Documentation**
   - Document all endpoints in `API.md`
   - Include request/response examples
   - Document authentication requirements

3. **README Updates**
   - Keep setup instructions current
   - Document new environment variables
   - Include troubleshooting guides

## 🔄 Git & Development Workflow

### Commit Messages
```
feat: add car reservation functionality
fix: resolve JWT token expiration issue  
docs: update API documentation
refactor: extract validation schemas
style: format code with prettier
test: add car service unit tests
```

### Branch Naming
```
feature/car-reservation-system
bugfix/jwt-token-expiration
hotfix/security-vulnerability
refactor/database-schema
```

## 🚨 Common Pitfalls to Avoid

1. **❌ Don't** use `any` type unless absolutely necessary
2. **❌ Don't** commit sensitive data (API keys, passwords)
3. **❌ Don't** write overly complex components (prefer composition)
4. **❌ Don't** ignore TypeScript warnings
5. **❌ Don't** skip error handling in async functions
6. **❌ Don't** use inline styles (use styled-components)
7. **❌ Don't** mutate props or state directly
8. **❌ Don't** ignore accessibility (a11y) requirements

## ✅ Quick Checklist Before Committing

- [ ] Code compiles without TypeScript errors
- [ ] All tests pass (`npm test`)
- [ ] Code is properly formatted (`npm run lint:fix`)
- [ ] No console.log statements in production code
- [ ] Environment variables documented in `.env.example`
- [ ] API changes documented in `API.md`
- [ ] New dependencies justified and documented

## 🔧 IDE Configuration

### VS Code Settings
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.exclude": {
    "**/node_modules": true,
    "**/.next": true,
    "**/dist": true
  }
}
```

### Recommended Extensions
- TypeScript Importer
- Prettier - Code formatter
- ESLint
- Styled Components
- Prisma
- Thunder Client (API testing)

---

## 📞 Need Help?

- Check existing documentation in project root
- Review similar implementations in the codebase
- Ask questions in team chat before making assumptions
- When in doubt, prefer explicit over implicit code

Remember: **Code is read more often than it's written.** Write code that your future self (and your teammates) will thank you for! 🎉
