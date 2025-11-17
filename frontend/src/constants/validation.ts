// Validation constants and patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE: /^[+]?[(]?[0-9]{1,3}[)]?[-\s.]?[(]?[0-9]{1,3}[)]?[-\s.]?[0-9]{3,5}[-\s.]?[0-9]{3,6}$/,
} as const;

export const VALIDATION_MESSAGES = {
  EMAIL: {
    REQUIRED: 'Email is required',
    INVALID: 'Please enter a valid email address',
  },
  PASSWORD: {
    REQUIRED: 'Password is required',
    MIN_LENGTH: 'Password must be at least 6 characters long',
  },
  FIRST_NAME: {
    REQUIRED: 'First name is required',
    MIN_LENGTH: 'First name must be at least 2 characters long',
  },
  LAST_NAME: {
    REQUIRED: 'Last name is required',
    MIN_LENGTH: 'Last name must be at least 2 characters long',
  },
  CONFIRM_PASSWORD: {
    REQUIRED: 'Please confirm your password',
    MATCH: 'Passwords do not match',
  },
  PHONE: {
    INVALID: 'Please enter a valid phone number',
  },
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    UNEXPECTED_ERROR: 'An unexpected error occurred',
    REGISTRATION_SUCCESS: 'Account created successfully! Please log in.',
    REGISTRATION_ERROR: 'Failed to create account. Please try again.',
    USER_EXISTS: 'An account with this email already exists',
  },
} as const;

export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 6,
} as const;
