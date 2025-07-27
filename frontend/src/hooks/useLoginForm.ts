import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { loginSchema, type LoginFormData } from '@/schemas/loginSchema';
import { VALIDATION_MESSAGES } from '@/constants/validation';

export const useLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError(VALIDATION_MESSAGES.AUTH.INVALID_CREDENTIALS);
      } else if (result?.ok) {
        router.push('/'); // Redirect to home page on successful login
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(VALIDATION_MESSAGES.AUTH.UNEXPECTED_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    ...form,
    isLoading,
    error,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
