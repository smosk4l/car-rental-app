# API Documentation

## Base URL
```
http://localhost:5001/api
```

## Authentication
Most endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <jwt-token>
```

## Endpoints

### Health Check
- **GET** `/health`
- **Description**: Check if the API is running
- **Response**: 
  ```json
  {
    "status": "OK",
    "message": "Car Rental API is running"
  }
  ```

### Authentication

#### Register User
- **POST** `/auth/register`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "1234567890"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": "user-id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "phone": "1234567890",
      "role": "USER"
    },
    "token": "jwt-token"
  }
  ```

#### Login User
- **POST** `/auth/login`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Login successful",
    "user": {
      "id": "user-id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "phone": "1234567890",
      "role": "USER"
    },
    "token": "jwt-token"
  }
  ```

### Cars

#### Get All Cars
- **GET** `/cars`
- **Query Parameters**:
  - `category` (optional): Filter by car category
  - `minPrice` (optional): Minimum price per day
  - `maxPrice` (optional): Maximum price per day
  - `available` (optional): Filter by availability (true/false)
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 10)
- **Response**:
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

#### Get Car by ID
- **GET** `/cars/:id`
- **Response**: Single car object

#### Create Car (Admin Only)
- **POST** `/cars`
- **Headers**: `Authorization: Bearer <admin-token>`
- **Body**:
  ```json
  {
    "make": "Toyota",
    "model": "Camry",
    "year": 2023,
    "color": "White",
    "licensePlate": "ABC123",
    "pricePerDay": 50.00,
    "description": "Comfortable sedan",
    "imageUrl": "https://example.com/image.jpg",
    "category": "MIDSIZE",
    "transmission": "AUTOMATIC",
    "fuelType": "GASOLINE",
    "seats": 5
  }
  ```

#### Update Car (Admin Only)
- **PUT** `/cars/:id`
- **Headers**: `Authorization: Bearer <admin-token>`
- **Body**: Partial car object

#### Delete Car (Admin Only)
- **DELETE** `/cars/:id`
- **Headers**: `Authorization: Bearer <admin-token>`

### Users

#### Get User Profile
- **GET** `/users/profile`
- **Headers**: `Authorization: Bearer <token>`

#### Update User Profile
- **PUT** `/users/profile`
- **Headers**: `Authorization: Bearer <token>`

#### Get All Users (Admin Only)
- **GET** `/users`
- **Headers**: `Authorization: Bearer <admin-token>`

### Reservations

#### Get User Reservations
- **GET** `/reservations`
- **Headers**: `Authorization: Bearer <token>`

#### Create Reservation
- **POST** `/reservations`
- **Headers**: `Authorization: Bearer <token>`

#### Get Reservation by ID
- **GET** `/reservations/:id`
- **Headers**: `Authorization: Bearer <token>`

#### Update Reservation
- **PUT** `/reservations/:id`
- **Headers**: `Authorization: Bearer <token>`

#### Cancel Reservation
- **DELETE** `/reservations/:id`
- **Headers**: `Authorization: Bearer <token>`

## Error Responses

All errors follow this format:
```json
{
  "error": "Error message",
  "details": "Additional error details (optional)"
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid or missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error
