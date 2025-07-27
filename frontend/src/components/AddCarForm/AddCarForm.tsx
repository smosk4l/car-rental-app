import React from 'react';
import { Car, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { useAddCarForm } from '@/hooks/useAddCarForm';
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
} from './styles';

const AddCarForm = () => {
  const { form, onSubmit, resetForm, isLoading, submitError, submitSuccess } =
    useAddCarForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <FormContainer>
      <FormHeader>
        <FormTitle>
          <Car />
          <span>Add New Car</span>
        </FormTitle>
      </FormHeader>

      <FormContent>
        {submitError && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem',
              marginBottom: '1.5rem',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '0.375rem',
              color: '#dc2626',
            }}
          >
            <AlertCircle size={16} />
            <span>{submitError}</span>
          </div>
        )}

        {submitSuccess && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem',
              marginBottom: '1.5rem',
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '0.375rem',
              color: '#16a34a',
            }}
          >
            <CheckCircle size={16} />
            <span>Car added successfully!</span>
          </div>
        )}

        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          {/* Basic Information */}
          <FormGrid>
            <FormField>
              <FormLabel>Make *</FormLabel>
              <FormInput
                placeholder="e.g., Toyota, BMW, Ford"
                hasError={!!errors.make}
                {...register('make')}
              />
              {errors.make && <FormError>{errors.make.message}</FormError>}
            </FormField>

            <FormField>
              <FormLabel>Model *</FormLabel>
              <FormInput
                placeholder="e.g., Camry, X5, Mustang"
                hasError={!!errors.model}
                {...register('model')}
              />
              {errors.model && <FormError>{errors.model.message}</FormError>}
            </FormField>

            <FormField>
              <FormLabel>Year *</FormLabel>
              <FormInput
                type="number"
                placeholder="e.g., 2023"
                hasError={!!errors.year}
                {...register('year', { valueAsNumber: true })}
              />
              {errors.year && <FormError>{errors.year.message}</FormError>}
            </FormField>

            <FormField>
              <FormLabel>Color *</FormLabel>
              <FormInput
                placeholder="e.g., White, Black, Red"
                hasError={!!errors.color}
                {...register('color')}
              />
              {errors.color && <FormError>{errors.color.message}</FormError>}
            </FormField>

            <FormField>
              <FormLabel>License Plate *</FormLabel>
              <FormInput
                placeholder="e.g., ABC-1234"
                hasError={!!errors.licensePlate}
                {...register('licensePlate')}
              />
              {errors.licensePlate && (
                <FormError>{errors.licensePlate.message}</FormError>
              )}
            </FormField>

            <FormField>
              <FormLabel>Price Per Day ($) *</FormLabel>
              <FormInput
                type="number"
                step="0.01"
                placeholder="e.g., 49.99"
                hasError={!!errors.pricePerDay}
                {...register('pricePerDay', { valueAsNumber: true })}
              />
              {errors.pricePerDay && (
                <FormError>{errors.pricePerDay.message}</FormError>
              )}
            </FormField>
          </FormGrid>

          {/* Category and Specifications */}
          <FormGrid columns={4}>
            <FormField>
              <FormLabel>Category *</FormLabel>
              <FormSelect
                hasError={!!errors.category}
                {...register('category')}
              >
                <option value="">Select category</option>
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
              <FormLabel>Transmission *</FormLabel>
              <FormSelect
                hasError={!!errors.transmission}
                {...register('transmission')}
              >
                <option value="MANUAL">Manual</option>
                <option value="AUTOMATIC">Automatic</option>
              </FormSelect>
              {errors.transmission && (
                <FormError>{errors.transmission.message}</FormError>
              )}
            </FormField>

            <FormField>
              <FormLabel>Fuel Type *</FormLabel>
              <FormSelect
                hasError={!!errors.fuelType}
                {...register('fuelType')}
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
              <FormLabel>Number of Seats</FormLabel>
              <FormInput
                type="number"
                placeholder="Default: 5"
                hasError={!!errors.seats}
                {...register('seats', { valueAsNumber: true })}
              />
              <FormDescription>Default is 5 if left empty</FormDescription>
              {errors.seats && <FormError>{errors.seats.message}</FormError>}
            </FormField>
          </FormGrid>

          {/* Optional Fields */}
          <div>
            <FormField>
              <FormLabel>Description (Optional)</FormLabel>
              <FormTextarea
                placeholder="Describe the car features, condition, or any special notes..."
                hasError={!!errors.description}
                {...register('description')}
              />
              {errors.description && (
                <FormError>{errors.description.message}</FormError>
              )}
            </FormField>

            <FormField style={{ marginTop: '1.5rem' }}>
              <FormLabel>Image URL (Optional)</FormLabel>
              <FormInput
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
                  <span>Adding Car...</span>
                </>
              ) : (
                <>
                  <Save />
                  <span>Add Car</span>
                </>
              )}
            </FormButton>
          </FormActions>
        </FormWrapper>
      </FormContent>
    </FormContainer>
  );
};

export default AddCarForm;
