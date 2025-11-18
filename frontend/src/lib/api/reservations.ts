import apiClient from '../api-auth';
import { Car } from './cars';

export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface Reservation {
  id: string;
  userId: string;
  carId: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  returnLocation: string;
  pickupTime: string;
  returnTime: string;
  totalCost: number;
  phoneNumber?: string;
  notes?: string;
  status: ReservationStatus;
  createdAt: string;
  updatedAt: string;
  car?: {
    id: string;
    make: string;
    model: string;
    year: number;
    imageUrl?: string;
    pricePerDay: number;
    category: string;
    transmission?: string;
    fuelType?: string;
    seats?: number;
    description?: string;
  };
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
  };
}

export interface CreateReservationDTO {
  carId: string;
  startDate: string; // ISO 8601 datetime string
  endDate: string; // ISO 8601 datetime string
  pickupLocation: string;
  returnLocation: string;
  pickupTime: string; // HH:MM format
  returnTime: string; // HH:MM format
  phoneNumber?: string;
  notes?: string;
}

export interface UpdateReservationDTO {
  startDate?: string;
  endDate?: string;
  pickupLocation?: string;
  returnLocation?: string;
  pickupTime?: string;
  returnTime?: string;
  phoneNumber?: string;
  notes?: string;
}

export interface ReservationsResponse {
  reservations: Reservation[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ReservationFilters {
  status?: ReservationStatus;
  page?: number;
  limit?: number;
}

export const reservationsApi = {
  // Create a new reservation
  createReservation: async (data: CreateReservationDTO): Promise<{ message: string; reservation: Reservation }> => {
    const response = await apiClient.post('/reservations', data);
    return response.data;
  },

  // Get user's reservations
  getUserReservations: async (filters?: ReservationFilters): Promise<ReservationsResponse> => {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }

    const response = await apiClient.get(`/reservations?${params.toString()}`);
    return response.data;
  },

  // Get a single reservation by ID
  getReservation: async (id: string): Promise<Reservation> => {
    const response = await apiClient.get(`/reservations/${id}`);
    return response.data;
  },

  // Update a reservation
  updateReservation: async (id: string, data: UpdateReservationDTO): Promise<{ message: string; reservation: Reservation }> => {
    const response = await apiClient.put(`/reservations/${id}`, data);
    return response.data;
  },

  // Cancel a reservation
  cancelReservation: async (id: string): Promise<{ message: string; reservation: Reservation }> => {
    const response = await apiClient.delete(`/reservations/${id}`);
    return response.data;
  },
};
