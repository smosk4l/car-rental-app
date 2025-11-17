export const UI_TEXT = {
  TITLE: 'Sign In',
  DESCRIPTION: 'Enter your credentials to access your account',
  LABELS: {
    EMAIL: 'Email',
    PASSWORD: 'Password',
  },
  PLACEHOLDERS: {
    EMAIL: 'Enter your email',
    PASSWORD: 'Enter your password',
  },
  BUTTONS: {
    SUBMIT: 'Sign In',
    SUBMITTING: 'Signing In...',
  },
  LINKS: {
    NO_ACCOUNT: "Don't have an account?",
    SIGN_UP: 'Sign up',
    BACK_HOME: 'Back to home',
  },
} as const;

export const REGISTER_UI_TEXT = {
  TITLE: 'Create Account',
  DESCRIPTION: 'Sign up to start renting cars with us',
  LABELS: {
    FIRST_NAME: 'First Name',
    LAST_NAME: 'Last Name',
    EMAIL: 'Email',
    PHONE: 'Phone Number (Optional)',
    PASSWORD: 'Password',
    CONFIRM_PASSWORD: 'Confirm Password',
  },
  PLACEHOLDERS: {
    FIRST_NAME: 'John',
    LAST_NAME: 'Doe',
    EMAIL: 'john.doe@example.com',
    PHONE: '+1 (555) 123-4567',
    PASSWORD: 'Create a password',
    CONFIRM_PASSWORD: 'Confirm your password',
  },
  BUTTONS: {
    SUBMIT: 'Create Account',
    SUBMITTING: 'Creating Account...',
  },
  LINKS: {
    HAVE_ACCOUNT: 'Already have an account?',
    SIGN_IN: 'Sign in',
    BACK_HOME: 'Back to home',
  },
} as const;
