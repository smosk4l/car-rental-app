import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi, type User, type UpdateProfileData } from '@/lib/api/users';
import { toast } from 'sonner';

// Query keys
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  profile: () => [...userKeys.all, 'profile'] as const,
};

// Hook to fetch all users (admin only)
export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: () => usersApi.getAllUsers(),
  });
};

// Hook to fetch current user profile
export const useUserProfile = () => {
  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: () => usersApi.getProfile(),
  });
};

// Hook to update user profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileData) => usersApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.profile() });
      toast.success('Profile updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update profile');
    },
  });
};

// Hook to suspend/reactivate user (admin only)
export const useSuspendUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersApi.suspendUser(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update user status');
    },
  });
};

// Hook to delete user (admin only)
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success('User deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to delete user');
    },
  });
};
