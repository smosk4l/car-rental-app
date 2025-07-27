import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { adminCarService } from '@/lib/adminCarService';
import { carFormSchema, CarFormValues } from '@/schemas/carSchema';

export const useAddCarForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<CarFormValues>({
    resolver: zodResolver(carFormSchema),
    defaultValues: {
      make: '',
      model: '',
      year: new Date().getFullYear(),
      color: '',
      licensePlate: '',
      pricePerDay: 0,
      category: 'ECONOMY',
      transmission: 'MANUAL',
      fuelType: 'GASOLINE',
      seats: 5,
      description: '',
      imageUrl: '',
      isAvailable: true,
    },
  });

  const onSubmit = async (values: CarFormValues) => {
    setIsLoading(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // Prepare data for API call
      const carData = {
        ...values,
        // Convert empty string to undefined for optional fields
        description: values.description || undefined,
        imageUrl: values.imageUrl || undefined,
        // Ensure these fields are strings as expected by the backend
        transmission: values.transmission as string,
        fuelType: values.fuelType as string,
      };

      await adminCarService.createCar(carData);

      setSubmitSuccess(true);
      form.reset(); // Reset form after successful submission

      // Show success toast
      toast.success('Car added successfully!');

      // Optional: You can add a timeout to hide success message
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error creating car:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to create car. Please try again.';

      setSubmitError(errorMessage);

      // Show error toast
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    form.reset();
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  return {
    form,
    onSubmit,
    resetForm,
    isLoading,
    submitError,
    submitSuccess,
  };
};
