export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
}

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  pricePerDay: number;
  isAvailable: boolean;
  description?: string;
  imageUrl?: string;
  category: 'ECONOMY' | 'COMPACT' | 'MIDSIZE' | 'FULLSIZE' | 'PREMIUM' | 'LUXURY' | 'SUV' | 'VAN';
  transmission: string;
  fuelType: string;
  seats: number;
  createdAt: string;
  updatedAt: string;
}

export interface Reservation {
  id: string;
  userId: string;
  carId: string;
  startDate: string;
  endDate: string;
  totalCost: number;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
  user: User;
  car: Car;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}
