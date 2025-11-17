import apiClient from '../api-auth';

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
  category: 'ECONOMY' | 'COMPACT' | 'MIDSIZE' | 'FULLSIZE' | 'PREMIUM' | 'LUXURY' | 'SUV' | 'VAN' | 'SEDAN' | 'SPORTS' | 'ELECTRIC';
  transmission: string;
  fuelType: string;
  seats: number;
  rating?: number;
  features?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CarsResponse {
  cars: Car[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CarFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  available?: boolean;
  page?: number;
  limit?: number;
}

export const carsApi = {
  // Get all cars with optional filters
  getCars: async (filters?: CarFilters): Promise<CarsResponse> => {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }
    
    const response = await apiClient.get(`/cars?${params.toString()}`);
    return response.data;
  },

  // Get a single car by ID
  getCar: async (id: string): Promise<Car> => {
    const response = await apiClient.get(`/cars/${id}`);
    return response.data;
  },

  // Create a new car (admin only)
  createCar: async (data: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ message: string; car: Car }> => {
    const response = await apiClient.post('/cars', data);
    return response.data;
  },

  // Update a car (admin only)
  updateCar: async (id: string, data: Partial<Omit<Car, 'id' | 'createdAt' | 'updatedAt'>>): Promise<{ message: string; car: Car }> => {
    const response = await apiClient.put(`/cars/${id}`, data);
    return response.data;
  },

  // Delete a car (admin only)
  deleteCar: async (id: string): Promise<{ message: string }> => {
    const response = await apiClient.delete(`/cars/${id}`);
    return response.data;
  },
};