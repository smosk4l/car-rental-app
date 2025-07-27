import { z } from 'zod';
import {
  VALIDATION_PATTERNS,
  VALIDATION_MESSAGES,
  VALIDATION_RULES,
} from '@/constants/validation';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, VALIDATION_MESSAGES.EMAIL.REQUIRED)
    .regex(VALIDATION_PATTERNS.EMAIL, VALIDATION_MESSAGES.EMAIL.INVALID),
  password: z
    .string()
    .min(1, VALIDATION_MESSAGES.PASSWORD.REQUIRED)
    .min(
      VALIDATION_RULES.PASSWORD_MIN_LENGTH,
      VALIDATION_MESSAGES.PASSWORD.MIN_LENGTH
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;
