import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { carsApi, type Car, type CarFilters } from '@/lib/api/cars';
import { toast } from 'sonner';

// Query keys
export const carKeys = {
  all: ['cars'] as const,
  lists: () => [...carKeys.all, 'list'] as const,
  list: (filters?: CarFilters) => [...carKeys.lists(), filters] as const,
  details: () => [...carKeys.all, 'detail'] as const,
  detail: (id: string) => [...carKeys.details(), id] as const,
};

// Hook to fetch all cars
export const useCars = (filters?: CarFilters) => {
  return useQuery({
    queryKey: carKeys.list(filters),
    queryFn: () => carsApi.getCars(filters),
  });
};

// Hook to fetch a single car
export const useCar = (id: string) => {
  return useQuery({
    queryKey: carKeys.detail(id),
    queryFn: () => carsApi.getCar(id),
    enabled: !!id,
  });
};

// Hook to create a car
export const useCreateCar = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>) => carsApi.createCar(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carKeys.lists() });
      toast.success('Car created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to create car');
    },
  });
};

// Hook to update a car
export const useUpdateCar = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<Car, 'id' | 'createdAt' | 'updatedAt'>> }) => 
      carsApi.updateCar(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: carKeys.lists() });
      queryClient.invalidateQueries({ queryKey: carKeys.detail(variables.id) });
      toast.success('Car updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update car');
    },
  });
};

// Hook to delete a car
export const useDeleteCar = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => carsApi.deleteCar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carKeys.lists() });
      toast.success('Car deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to delete car');
    },
  });
};