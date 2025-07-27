import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginSchema, type LoginFormData } from '@/schemas/loginSchema';
import { VALIDATION_MESSAGES } from '@/constants/validation';
import { getRedirectRoute, type UserRole } from '@/utils/role';

interface UseLoginFormOptions {
  redirectUrl?: string;
  onSuccess?: (userRole: string) => void;
}

export const useLoginForm = (options: UseLoginFormOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

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
        return setError(VALIDATION_MESSAGES.AUTH.INVALID_CREDENTIALS);
      }

      // Get the updated session to access user role
      const session = await fetch('/api/auth/session').then(res => res.json());
      const userRole = (session?.user?.role || 'USER') as UserRole;

      // Call custom success callback if provided
      if (options.onSuccess) {
        options.onSuccess(userRole);
      }

      // Determine redirect URL using utility function
      const callbackUrl = searchParams.get('callbackUrl');
      const redirectUrl = getRedirectRoute(
        userRole,
        callbackUrl || undefined,
        options.redirectUrl
      );

      router.push(redirectUrl);
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
