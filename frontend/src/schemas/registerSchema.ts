import { z } from 'zod';
import {
  VALIDATION_PATTERNS,
  VALIDATION_MESSAGES,
  VALIDATION_RULES,
} from '@/constants/validation';

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, VALIDATION_MESSAGES.FIRST_NAME.REQUIRED)
      .min(2, VALIDATION_MESSAGES.FIRST_NAME.MIN_LENGTH),
    lastName: z
      .string()
      .min(1, VALIDATION_MESSAGES.LAST_NAME.REQUIRED)
      .min(2, VALIDATION_MESSAGES.LAST_NAME.MIN_LENGTH),
    email: z
      .string()
      .min(1, VALIDATION_MESSAGES.EMAIL.REQUIRED)
      .regex(VALIDATION_PATTERNS.EMAIL, VALIDATION_MESSAGES.EMAIL.INVALID),
    phone: z
      .string()
      .optional()
      .refine(
        (val) => !val || VALIDATION_PATTERNS.PHONE.test(val),
        { message: VALIDATION_MESSAGES.PHONE.INVALID }
      ),
    password: z
      .string()
      .min(1, VALIDATION_MESSAGES.PASSWORD.REQUIRED)
      .min(
        VALIDATION_RULES.PASSWORD_MIN_LENGTH,
        VALIDATION_MESSAGES.PASSWORD.MIN_LENGTH
      ),
    confirmPassword: z
      .string()
      .min(1, VALIDATION_MESSAGES.CONFIRM_PASSWORD.REQUIRED),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: VALIDATION_MESSAGES.CONFIRM_PASSWORD.MATCH,
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
