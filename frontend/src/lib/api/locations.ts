import apiClient from '../api-auth';

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  createdAt: string;
  updatedAt: string;
}

export interface LocationsResponse {
  locations: Location[];
}

export const locationsApi = {
  // Get all locations
  getLocations: async (): Promise<LocationsResponse> => {
    const response = await apiClient.get('/locations');
    return response.data;
  },

  // Get a single location by ID
  getLocation: async (id: string): Promise<Location> => {
    const response = await apiClient.get(`/locations/${id}`);
    return response.data;
  },

  // Create a new location (admin only)
  createLocation: async (
    data: Omit<Location, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<{ message: string; location: Location }> => {
    const response = await apiClient.post('/locations', data);
    return response.data;
  },

  // Update a location (admin only)
  updateLocation: async (
    id: string,
    data: Partial<Omit<Location, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<{ message: string; location: Location }> => {
    const response = await apiClient.put(`/locations/${id}`, data);
    return response.data;
  },

  // Delete a location (admin only)
  deleteLocation: async (id: string): Promise<{ message: string }> => {
    const response = await apiClient.delete(`/locations/${id}`);
    return response.data;
  },
};
