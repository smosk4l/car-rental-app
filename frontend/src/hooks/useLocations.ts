import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { locationsApi, type Location } from '@/lib/api/locations';
import { toast } from 'sonner';

// Query keys
const locationKeys = {
  all: ['locations'] as const,
  lists: () => [...locationKeys.all, 'list'] as const,
  details: () => [...locationKeys.all, 'detail'] as const,
  detail: (id: string) => [...locationKeys.details(), id] as const,
};

/**
 * Combined hook for all location operations
 * Returns queries and mutations in a single object
 */
export const useLocations = () => {
  const queryClient = useQueryClient();

  // Query for fetching all locations
  const locationsQuery = useQuery({
    queryKey: locationKeys.lists(),
    queryFn: () => locationsApi.getLocations(),
  });

  // Mutation for creating a location
  const createLocationMutation = useMutation({
    mutationFn: (data: Omit<Location, 'id' | 'createdAt' | 'updatedAt'>) =>
      locationsApi.createLocation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: locationKeys.lists() });
      toast.success('Location created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to create location');
    },
  });

  // Mutation for updating a location
  const updateLocationMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Omit<Location, 'id' | 'createdAt' | 'updatedAt'>>;
    }) => locationsApi.updateLocation(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: locationKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: locationKeys.detail(variables.id),
      });
      toast.success('Location updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update location');
    },
  });

  // Mutation for deleting a location
  const deleteLocationMutation = useMutation({
    mutationFn: (id: string) => locationsApi.deleteLocation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: locationKeys.lists() });
      toast.success('Location deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to delete location');
    },
  });

  return {
    // Data queries
    locations: locationsQuery,

    // Mutations
    createLocation: createLocationMutation,
    updateLocation: updateLocationMutation,
    deleteLocation: deleteLocationMutation,
  };
};

// Optional: Hook to fetch a single location by ID
export const useLocation = (id: string) => {
  return useQuery({
    queryKey: locationKeys.detail(id),
    queryFn: () => locationsApi.getLocation(id),
    enabled: !!id,
  });
};
