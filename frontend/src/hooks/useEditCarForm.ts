import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { adminCarService } from '@/lib/adminCarService';
import { carFormSchema, CarFormValues } from '@/schemas/carSchema';
import { Car } from '@/types';

export const useEditCarForm = (carId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCar, setIsLoadingCar] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [car, setCar] = useState<Car | null>(null);

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

  // Load car data on mount
  useEffect(() => {
    const loadCar = async () => {
      try {
        setIsLoadingCar(true);
        const carData = await adminCarService.getCarById(carId);
        setCar(carData);

        // Reset form with car data
        form.reset({
          make: carData.make,
          model: carData.model,
          year: carData.year,
          color: carData.color,
          licensePlate: carData.licensePlate,
          pricePerDay: carData.pricePerDay,
          category: carData.category as CarFormValues['category'],
          transmission:
            (carData.transmission as CarFormValues['transmission']) || 'MANUAL',
          fuelType:
            (carData.fuelType as CarFormValues['fuelType']) || 'GASOLINE',
          seats: carData.seats || 5,
          description: carData.description || '',
          imageUrl: carData.imageUrl || '',
          isAvailable: carData.isAvailable,
        });
      } catch (error) {
        console.error('Error loading car:', error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Failed to load car data. Please try again.';

        setSubmitError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoadingCar(false);
      }
    };

    if (carId) {
      loadCar();
    }
  }, [carId, form]);

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

      await adminCarService.updateCar(carId, carData);

      setSubmitSuccess(true);

      // Show success toast
      toast.success('Car updated successfully!');

      // Optional: You can add a timeout to hide success message
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error updating car:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to update car. Please try again.';

      setSubmitError(errorMessage);

      // Show error toast
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    if (car) {
      form.reset({
        make: car.make,
        model: car.model,
        year: car.year,
        color: car.color,
        licensePlate: car.licensePlate,
        pricePerDay: car.pricePerDay,
        category: car.category as CarFormValues['category'],
        transmission:
          (car.transmission as CarFormValues['transmission']) || 'MANUAL',
        fuelType: (car.fuelType as CarFormValues['fuelType']) || 'GASOLINE',
        seats: car.seats || 5,
        description: car.description || '',
        imageUrl: car.imageUrl || '',
        isAvailable: car.isAvailable,
      });
    }
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  return {
    form,
    onSubmit,
    resetForm,
    isLoading,
    isLoadingCar,
    submitError,
    submitSuccess,
    car,
  };
};
