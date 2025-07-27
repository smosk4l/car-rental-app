import React from 'react';
import {
  Car,
  Save,
  AlertCircle,
  CheckCircle,
  Loader,
  Plus,
} from 'lucide-react';
import { useAddCarForm } from '@/hooks/useAddCarForm';
import { useEditCarForm } from '@/hooks/useEditCarForm';
import {
  FormContainer,
  FormHeader,
  FormTitle,
  FormContent,
  FormWrapper,
  FormGrid,
  FormField,
  FormLabel,
  FormInput,
  FormTextarea,
  FormSelect,
  FormCheckboxContainer,
  FormCheckbox,
  FormCheckboxContent,
  FormDescription,
  FormError,
  FormActions,
  FormButton,
  LoadingSpinner,
} from '../AddCarForm/styles';

interface CarFormProps {
  mode: 'add' | 'edit';
  carId?: string;
}

const CarForm: React.FC<CarFormProps> = ({ mode, carId }) => {
  // Use the appropriate hook based on mode
  const addCarData = useAddCarForm();
  const editCarData = useEditCarForm(carId || '');

  // Select the correct hook data based on mode
  const isAddMode = mode === 'add';
  const hookData = isAddMode ? addCarData : editCarData;

  const { form, onSubmit, resetForm, isLoading, submitError, submitSuccess } =
    hookData;

  // These properties only exist in edit mode
  const isLoadingCar =
    !isAddMode && 'isLoadingCar' in editCarData
      ? editCarData.isLoadingCar
      : false;
  const car = !isAddMode && 'car' in editCarData ? editCarData.car : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  // Show loading state for edit mode
  if (mode === 'edit' && isLoadingCar) {
    return (
      <FormContainer>
        <FormHeader>
          <FormTitle>
            <Car />
            <span>Loading Car...</span>
          </FormTitle>
        </FormHeader>
        <FormContent>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '200px',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <Loader
              size={32}
              style={{ animation: 'spin 1s linear infinite' }}
            />
            <span>Loading car data...</span>
          </div>
        </FormContent>
      </FormContainer>
    );
  }

  // Show error state for edit mode when car is not found
  if (mode === 'edit' && !car) {
    return (
      <FormContainer>
        <FormHeader>
          <FormTitle>
            <Car />
            <span>Car Not Found</span>
          </FormTitle>
        </FormHeader>
        <FormContent>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '200px',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <AlertCircle size={32} color="#ef4444" />
            <span>Car not found or failed to load.</span>
          </div>
        </FormContent>
      </FormContainer>
    );
  }

  const titleText = isAddMode
    ? 'Add New Car'
    : `Edit Car - ${car?.make} ${car?.model}`;
  const submitButtonText = isAddMode ? 'Add Car' : 'Update Car';
  const loadingText = isAddMode ? 'Adding Car...' : 'Updating Car...';
  const successMessage = isAddMode
    ? 'Car added successfully!'
    : 'Car updated successfully!';

  return (
    <FormContainer>
      <FormHeader>
        <FormTitle>
          <Car />
          <span>{titleText}</span>
        </FormTitle>
      </FormHeader>

      <FormContent>
        {submitError && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              color: '#dc2626',
              marginBottom: '24px',
            }}
          >
            <AlertCircle size={20} />
            <span>{submitError}</span>
          </div>
        )}

        {submitSuccess && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px',
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '8px',
              color: '#16a34a',
              marginBottom: '24px',
            }}
          >
            <CheckCircle size={20} />
            <span>{successMessage}</span>
          </div>
        )}

        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <FormGrid>
            {/* Make */}
            <FormField>
              <FormLabel htmlFor="make">Make *</FormLabel>
              <FormInput
                id="make"
                type="text"
                placeholder="e.g., Toyota, BMW, Ford"
                {...register('make')}
                hasError={!!errors.make}
              />
              {errors.make && <FormError>{errors.make.message}</FormError>}
            </FormField>

            {/* Model */}
            <FormField>
              <FormLabel htmlFor="model">Model *</FormLabel>
              <FormInput
                id="model"
                type="text"
                placeholder="e.g., Camry, X5, Mustang"
                {...register('model')}
                hasError={!!errors.model}
              />
              {errors.model && <FormError>{errors.model.message}</FormError>}
            </FormField>

            {/* Year */}
            <FormField>
              <FormLabel htmlFor="year">Year *</FormLabel>
              <FormInput
                id="year"
                type="number"
                min="1900"
                max={new Date().getFullYear() + 1}
                placeholder="e.g., 2023"
                {...register('year', { valueAsNumber: true })}
                hasError={!!errors.year}
              />
              {errors.year && <FormError>{errors.year.message}</FormError>}
            </FormField>

            {/* Color */}
            <FormField>
              <FormLabel htmlFor="color">Color *</FormLabel>
              <FormInput
                id="color"
                type="text"
                placeholder="e.g., White, Black, Red"
                {...register('color')}
                hasError={!!errors.color}
              />
              {errors.color && <FormError>{errors.color.message}</FormError>}
            </FormField>

            {/* License Plate */}
            <FormField>
              <FormLabel htmlFor="licensePlate">License Plate *</FormLabel>
              <FormInput
                id="licensePlate"
                type="text"
                placeholder="e.g., ABC-1234"
                {...register('licensePlate')}
                hasError={!!errors.licensePlate}
              />
              {errors.licensePlate && (
                <FormError>{errors.licensePlate.message}</FormError>
              )}
            </FormField>

            {/* Price Per Day */}
            <FormField>
              <FormLabel htmlFor="pricePerDay">Price Per Day ($) *</FormLabel>
              <FormInput
                id="pricePerDay"
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g., 49.99"
                {...register('pricePerDay', { valueAsNumber: true })}
                hasError={!!errors.pricePerDay}
              />
              {errors.pricePerDay && (
                <FormError>{errors.pricePerDay.message}</FormError>
              )}
            </FormField>
          </FormGrid>

          {/* Category and Specifications */}
          <FormGrid columns={4}>
            <FormField>
              <FormLabel htmlFor="category">Category *</FormLabel>
              <FormSelect
                id="category"
                {...register('category')}
                hasError={!!errors.category}
              >
                {isAddMode && <option value="">Select category</option>}
                <option value="ECONOMY">Economy</option>
                <option value="COMPACT">Compact</option>
                <option value="MIDSIZE">Midsize</option>
                <option value="FULLSIZE">Full Size</option>
                <option value="PREMIUM">Premium</option>
                <option value="LUXURY">Luxury</option>
                <option value="SUV">SUV</option>
                <option value="VAN">Van</option>
              </FormSelect>
              {errors.category && (
                <FormError>{errors.category.message}</FormError>
              )}
            </FormField>

            <FormField>
              <FormLabel htmlFor="transmission">Transmission *</FormLabel>
              <FormSelect
                id="transmission"
                {...register('transmission')}
                hasError={!!errors.transmission}
              >
                <option value="MANUAL">Manual</option>
                <option value="AUTOMATIC">Automatic</option>
              </FormSelect>
              {errors.transmission && (
                <FormError>{errors.transmission.message}</FormError>
              )}
            </FormField>

            <FormField>
              <FormLabel htmlFor="fuelType">Fuel Type *</FormLabel>
              <FormSelect
                id="fuelType"
                {...register('fuelType')}
                hasError={!!errors.fuelType}
              >
                <option value="GASOLINE">Gasoline</option>
                <option value="DIESEL">Diesel</option>
                <option value="ELECTRIC">Electric</option>
                <option value="HYBRID">Hybrid</option>
              </FormSelect>
              {errors.fuelType && (
                <FormError>{errors.fuelType.message}</FormError>
              )}
            </FormField>

            <FormField>
              <FormLabel htmlFor="seats">Number of Seats *</FormLabel>
              <FormInput
                id="seats"
                type="number"
                min="1"
                max="50"
                placeholder={isAddMode ? 'Default: 5' : undefined}
                {...register('seats', { valueAsNumber: true })}
                hasError={!!errors.seats}
              />
              {isAddMode && (
                <FormDescription>Default is 5 if left empty</FormDescription>
              )}
              {errors.seats && <FormError>{errors.seats.message}</FormError>}
            </FormField>
          </FormGrid>

          {/* Optional Fields */}
          <div>
            <FormField>
              <FormLabel htmlFor="description">
                Description (Optional)
              </FormLabel>
              <FormTextarea
                id="description"
                placeholder="Describe the car features, condition, or any special notes..."
                hasError={!!errors.description}
                {...register('description')}
              />
              {errors.description && (
                <FormError>{errors.description.message}</FormError>
              )}
            </FormField>

            <FormField style={{ marginTop: '1.5rem' }}>
              <FormLabel htmlFor="imageUrl">Image URL (Optional)</FormLabel>
              <FormInput
                id="imageUrl"
                placeholder="https://example.com/car-image.jpg"
                hasError={!!errors.imageUrl}
                {...register('imageUrl')}
              />
              <FormDescription>
                Provide a URL to an image of the car
              </FormDescription>
              {errors.imageUrl && (
                <FormError>{errors.imageUrl.message}</FormError>
              )}
            </FormField>

            <FormCheckboxContainer style={{ marginTop: '1.5rem' }}>
              <FormCheckbox type="checkbox" {...register('isAvailable')} />
              <FormCheckboxContent>
                <FormLabel>Available for Rent</FormLabel>
                <FormDescription>
                  Check this box if the car is available for rental
                </FormDescription>
              </FormCheckboxContent>
            </FormCheckboxContainer>
          </div>

          <FormActions>
            <FormButton
              type="button"
              variant="outline"
              onClick={resetForm}
              disabled={isLoading}
            >
              Reset Form
            </FormButton>
            <FormButton type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  <span>{loadingText}</span>
                </>
              ) : (
                <>
                  {isAddMode ? <Plus /> : <Save />}
                  <span>{submitButtonText}</span>
                </>
              )}
            </FormButton>
          </FormActions>
        </FormWrapper>
      </FormContent>
    </FormContainer>
  );
};

export default CarForm;
