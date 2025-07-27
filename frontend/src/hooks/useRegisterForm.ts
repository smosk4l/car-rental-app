import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import {
  registerSchema,
  type RegisterFormData,
} from '@/schemas/registerSchema';
import { VALIDATION_MESSAGES } from '@/constants/validation';

export const useRegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...registerData } = data;

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.error === 'User already exists with this email') {
          setError(VALIDATION_MESSAGES.AUTH.USER_EXISTS);
        } else {
          setError(result.error || VALIDATION_MESSAGES.AUTH.REGISTRATION_ERROR);
        }
        return;
      }

      setSuccess(VALIDATION_MESSAGES.AUTH.REGISTRATION_SUCCESS);

      // Redirect to login page after successful registration
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
      setError(VALIDATION_MESSAGES.AUTH.UNEXPECTED_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    ...form,
    isLoading,
    error,
    success,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
