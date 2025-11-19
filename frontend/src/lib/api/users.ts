import apiClient from '../api-auth';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'USER' | 'ADMIN';
  status: 'ACTIVE' | 'SUSPENDED';
  createdAt: string;
  updatedAt: string;
}

export interface UsersResponse {
  users: User[];
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export const usersApi = {
  // Get current user profile
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get('/users/profile');
    return response.data;
  },

  // Update current user profile
  updateProfile: async (data: UpdateProfileData): Promise<{ message: string; user: User }> => {
    const response = await apiClient.put('/users/profile', data);
    return response.data;
  },

  // Get all users (admin only)
  getAllUsers: async (): Promise<UsersResponse> => {
    const response = await apiClient.get('/users');
    return response.data;
  },

  // Suspend/reactivate user (admin only)
  suspendUser: async (id: string): Promise<{ message: string; user: User }> => {
    const response = await apiClient.patch(`/users/${id}/suspend`);
    return response.data;
  },

  // Delete user (admin only)
  deleteUser: async (id: string): Promise<{ message: string }> => {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  },
};
