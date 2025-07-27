import React from 'react';
import { Button } from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { Label } from '@/components/UI/Label';
import { FormGroup, ErrorMessage } from './styles';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { type LoginFormData } from '@/schemas/loginSchema';
import { UI_TEXT } from '@/constants/ui';

interface LoginFormFieldsProps {
  register: UseFormRegister<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  isLoading: boolean;
  error: string;
}

export const LoginFormFields: React.FC<LoginFormFieldsProps> = ({
  register,
  errors,
  isLoading,
  error,
}) => {
  return (
    <>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <FormGroup>
        <Label htmlFor="email">{UI_TEXT.LABELS.EMAIL}</Label>
        <Input
          id="email"
          type="email"
          placeholder={UI_TEXT.PLACEHOLDERS.EMAIL}
          {...register('email')}
          disabled={isLoading}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="password">{UI_TEXT.LABELS.PASSWORD}</Label>
        <Input
          id="password"
          type="password"
          placeholder={UI_TEXT.PLACEHOLDERS.PASSWORD}
          {...register('password')}
          disabled={isLoading}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </FormGroup>

      <Button type="submit" fullWidth disabled={isLoading}>
        {isLoading ? UI_TEXT.BUTTONS.SUBMITTING : UI_TEXT.BUTTONS.SUBMIT}
      </Button>
    </>
  );
};
