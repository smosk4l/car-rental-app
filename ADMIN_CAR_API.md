# Admin Car Management API

This document describes the admin car management endpoints implemented as Next.js API routes that communicate with the backend API.

## Authentication

All admin endpoints require:
1. User must be logged in via NextAuth
2. User must have `ADMIN` role
3. Valid session with `accessToken`

## Endpoints

### GET /api/admin/cars
Get all cars (including unavailable ones)

**Query Parameters:**
- `category`: Filter by car category
- `minPrice`: Minimum price per day
- `maxPrice`: Maximum price per day
- `available`: Filter by availability (true/false)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

**Response:**
```json
{
  "cars": [
    {
      "id": "car-id",
      "make": "Toyota",
      "model": "Camry",
      "year": 2023,
      "color": "White",
      "licensePlate": "ABC123",
      "pricePerDay": 50.00,
      "isAvailable": true,
      "description": "Comfortable sedan",
      "imageUrl": "https://example.com/image.jpg",
      "category": "MIDSIZE",
      "transmission": "AUTOMATIC",
      "fuelType": "GASOLINE",
      "seats": 5
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

### POST /api/admin/cars
Create a new car

**Required fields:**
- `make`: string
- `model`: string
- `year`: number (1900 to current year + 1)
- `color`: string
- `licensePlate`: string
- `pricePerDay`: number (positive)
- `category`: enum ['ECONOMY', 'COMPACT', 'MIDSIZE', 'FULLSIZE', 'PREMIUM', 'LUXURY', 'SUV', 'VAN']

**Optional fields:**
- `description`: string
- `imageUrl`: string (valid URL)
- `transmission`: string (default: "MANUAL")
- `fuelType`: string (default: "GASOLINE")
- `seats`: number (default: 5)

**Request Body:**
```json
{
  "make": "Toyota",
  "model": "Camry",
  "year": 2023,
  "color": "White",
  "licensePlate": "ABC123",
  "pricePerDay": 50.00,
  "category": "MIDSIZE",
  "description": "Comfortable sedan",
  "imageUrl": "https://example.com/image.jpg",
  "transmission": "AUTOMATIC",
  "fuelType": "GASOLINE",
  "seats": 5
}
```

### PUT /api/admin/cars/[id]
Update an existing car

**All fields are optional** - you can update any subset of car properties including:
- All fields from POST endpoint
- `isAvailable`: boolean (to mark cars as available/unavailable)

**Request Body:**
```json
{
  "pricePerDay": 55.00,
  "isAvailable": false,
  "description": "Updated description"
}
```

### DELETE /api/admin/cars/[id]
Delete a car (hard delete)

**Response:**
```json
{
  "message": "Car deleted successfully"
}
```

## Error Responses

### 401 Unauthorized
```json
{
  "error": "Unauthorized access"
}
```

### 403 Forbidden
```json
{
  "error": "Admin access required"
}
```

### 400 Bad Request (Validation Error)
```json
{
  "error": "Validation error",
  "details": [
    {
      "field": "pricePerDay",
      "message": "Price per day must be positive"
    }
  ]
}
```

### 404 Not Found
```json
{
  "error": "Car not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

## Frontend Service Usage

Use the `adminCarService` for easy integration:

```typescript
import { adminCarService } from '@/lib/adminCarService';

// Get all cars
const { cars, pagination } = await adminCarService.getAllCars({
  category: 'MIDSIZE',
  available: true,
  page: 1,
  limit: 10
});

// Create a car
const newCar = await adminCarService.createCar({
  make: 'Toyota',
  model: 'Camry',
  year: 2023,
  color: 'White',
  licensePlate: 'ABC123',
  pricePerDay: 50.00,
  category: 'MIDSIZE'
});

// Update a car
const updatedCar = await adminCarService.updateCar('car-id', {
  pricePerDay: 55.00,
  isAvailable: false
});

// Delete a car
await adminCarService.deleteCar('car-id');
```

## Implementation Details

- **Validation**: Uses Zod for request validation
- **Authentication**: Integrates with NextAuth session management
- **Proxy Pattern**: Frontend API routes proxy requests to backend API
- **Error Handling**: Comprehensive error handling with proper HTTP status codes
- **Type Safety**: Full TypeScript support with proper type definitions
