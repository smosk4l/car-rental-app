'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import {
  FormContainer,
  Title,
  Form,
  ErrorMessage,
  LoadingSpinner,
} from './styles';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string>('');
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setAuthError('Invalid email or password');
      } else if (result?.ok) {
        // Get session to determine redirect based on role
        const response = await fetch('/api/auth/session');
        const session = await response.json();

        if (session?.user?.role === 'ADMIN') {
          router.push('/dashboard/admin');
        } else {
          router.push('/dashboard/user');
        }
        router.refresh();
      }
    } catch (error) {
      console.error('Login error:', error);
      setAuthError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof LoginFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }

    // Clear auth error when user makes changes
    if (authError) {
      setAuthError('');
    }
  };

  return (
    <FormContainer>
      <Title>Sign In</Title>

      {authError && <ErrorMessage>{authError}</ErrorMessage>}

      <Form onSubmit={handleSubmit}>
        <Input
          id="email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          disabled={isLoading}
          fullWidth
          autoComplete="email"
        />

        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          disabled={isLoading}
          fullWidth
          autoComplete="current-password"
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <LoadingSpinner />
              <span style={{ marginLeft: '8px' }}>Signing In...</span>
            </>
          ) : (
            'Sign In'
          )}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default LoginForm;
