import { Car } from '@/types';

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Admin car service for managing cars
export const adminCarService = {
  // Get all cars (including unavailable ones)
  async getAllCars(filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    available?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ cars: Car[]; pagination?: PaginationInfo }> {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const queryString = params.toString();
    const url = `/api/admin/cars${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch cars');
    }

    return response.json();
  },

  // Get car by ID
  async getCarById(id: string): Promise<Car> {
    const response = await fetch(`/api/admin/cars/${id}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch car');
    }

    return response.json();
  },

  // Create a new car
  async createCar(carData: {
    make: string;
    model: string;
    year: number;
    color: string;
    licensePlate: string;
    pricePerDay: number;
    category:
      | 'ECONOMY'
      | 'COMPACT'
      | 'MIDSIZE'
      | 'FULLSIZE'
      | 'PREMIUM'
      | 'LUXURY'
      | 'SUV'
      | 'VAN';
    description?: string;
    imageUrl?: string;
    transmission?: string;
    fuelType?: string;
    seats?: number;
  }): Promise<Car> {
    const response = await fetch('/api/admin/cars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create car');
    }

    return response.json();
  },

  // Update a car
  async updateCar(
    id: string,
    updates: Partial<{
      make: string;
      model: string;
      year: number;
      color: string;
      licensePlate: string;
      pricePerDay: number;
      category:
        | 'ECONOMY'
        | 'COMPACT'
        | 'MIDSIZE'
        | 'FULLSIZE'
        | 'PREMIUM'
        | 'LUXURY'
        | 'SUV'
        | 'VAN';
      description: string;
      imageUrl: string;
      transmission: string;
      fuelType: string;
      seats: number;
      isAvailable: boolean;
    }>
  ): Promise<Car> {
    const response = await fetch(`/api/admin/cars/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update car');
    }

    return response.json();
  },

  // Delete a car
  async deleteCar(id: string): Promise<void> {
    const response = await fetch(`/api/admin/cars/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete car');
    }
  },
};
