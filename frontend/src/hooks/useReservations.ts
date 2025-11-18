import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reservationsApi, type CreateReservationDTO, type UpdateReservationDTO, type ReservationFilters } from '@/lib/api/reservations';
import { toast } from 'sonner';

// Query keys
export const reservationKeys = {
  all: ['reservations'] as const,
  lists: () => [...reservationKeys.all, 'list'] as const,
  list: (filters?: ReservationFilters) => [...reservationKeys.lists(), filters] as const,
  details: () => [...reservationKeys.all, 'detail'] as const,
  detail: (id: string) => [...reservationKeys.details(), id] as const,
};

// Hook to fetch user's reservations
export const useReservations = (filters?: ReservationFilters) => {
  return useQuery({
    queryKey: reservationKeys.list(filters),
    queryFn: () => reservationsApi.getUserReservations(filters),
  });
};

// Hook to fetch a single reservation
export const useReservation = (id: string) => {
  return useQuery({
    queryKey: reservationKeys.detail(id),
    queryFn: () => reservationsApi.getReservation(id),
    enabled: !!id,
  });
};

// Hook to create a reservation
export const useCreateReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReservationDTO) => reservationsApi.createReservation(data),
    onSuccess: () => {
      // Invalidate reservations list to refetch
      queryClient.invalidateQueries({ queryKey: reservationKeys.lists() });
    },
    onError: (error: any) => {
      // Extract error message from response
      const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Failed to create reservation';
      toast.error(errorMessage);
    },
  });
};

// Hook to update a reservation
export const useUpdateReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateReservationDTO }) =>
      reservationsApi.updateReservation(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: reservationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: reservationKeys.detail(variables.id) });
      toast.success('Reservation updated successfully');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Failed to update reservation';
      toast.error(errorMessage);
    },
  });
};

// Hook to cancel a reservation
export const useCancelReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => reservationsApi.cancelReservation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reservationKeys.lists() });
      toast.success('Reservation cancelled successfully');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || 'Failed to cancel reservation';
      toast.error(errorMessage);
    },
  });
};
