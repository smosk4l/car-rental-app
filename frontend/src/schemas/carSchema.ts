import * as z from 'zod';

export const carFormSchema = z.object({
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z
    .number()
    .min(1900, 'Year must be 1900 or later')
    .max(new Date().getFullYear() + 1, 'Year cannot be in the future'),
  color: z.string().min(1, 'Color is required'),
  licensePlate: z.string().min(1, 'License plate is required'),
  pricePerDay: z.number().min(0.01, 'Price per day must be greater than 0'),
  category: z.enum([
    'ECONOMY',
    'COMPACT',
    'MIDSIZE',
    'FULLSIZE',
    'PREMIUM',
    'LUXURY',
    'SUV',
    'VAN',
  ]),
  transmission: z.enum(['MANUAL', 'AUTOMATIC']),
  fuelType: z.enum(['GASOLINE', 'DIESEL', 'ELECTRIC', 'HYBRID']),
  seats: z
    .number()
    .min(1, 'Must have at least 1 seat')
    .max(50, 'Too many seats'),
  description: z.string().optional(),
  imageUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  isAvailable: z.boolean(),
});

export type CarFormValues = z.infer<typeof carFormSchema>;
