'use client';

import React from 'react';
import { Button } from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { Label } from '@/components/UI/Label';
import { FormGroup, FormRow, ErrorMessage, SuccessMessage } from './styles';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { type RegisterFormData } from '@/schemas/registerSchema';
import { REGISTER_UI_TEXT } from '@/constants/ui';

interface RegisterFormFieldsProps {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  isLoading: boolean;
  error: string;
  success: string;
}

export const RegisterFormFields: React.FC<RegisterFormFieldsProps> = ({
  register,
  errors,
  isLoading,
  error,
  success,
}) => {
  return (
    <>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}

      <FormRow>
        <FormGroup>
          <Label htmlFor="firstName">
            {REGISTER_UI_TEXT.LABELS.FIRST_NAME}
          </Label>
          <Input
            id="firstName"
            type="text"
            placeholder={REGISTER_UI_TEXT.PLACEHOLDERS.FIRST_NAME}
            {...register('firstName')}
            disabled={isLoading}
          />
          {errors.firstName && (
            <ErrorMessage>{errors.firstName.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="lastName">{REGISTER_UI_TEXT.LABELS.LAST_NAME}</Label>
          <Input
            id="lastName"
            type="text"
            placeholder={REGISTER_UI_TEXT.PLACEHOLDERS.LAST_NAME}
            {...register('lastName')}
            disabled={isLoading}
          />
          {errors.lastName && (
            <ErrorMessage>{errors.lastName.message}</ErrorMessage>
          )}
        </FormGroup>
      </FormRow>

      <FormGroup>
        <Label htmlFor="email">{REGISTER_UI_TEXT.LABELS.EMAIL}</Label>
        <Input
          id="email"
          type="email"
          placeholder={REGISTER_UI_TEXT.PLACEHOLDERS.EMAIL}
          {...register('email')}
          disabled={isLoading}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="password">{REGISTER_UI_TEXT.LABELS.PASSWORD}</Label>
        <Input
          id="password"
          type="password"
          placeholder={REGISTER_UI_TEXT.PLACEHOLDERS.PASSWORD}
          {...register('password')}
          disabled={isLoading}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="confirmPassword">
          {REGISTER_UI_TEXT.LABELS.CONFIRM_PASSWORD}
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder={REGISTER_UI_TEXT.PLACEHOLDERS.CONFIRM_PASSWORD}
          {...register('confirmPassword')}
          disabled={isLoading}
        />
        {errors.confirmPassword && (
          <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
        )}
      </FormGroup>

      <Button type="submit" fullWidth disabled={isLoading}>
        {isLoading
          ? REGISTER_UI_TEXT.BUTTONS.SUBMITTING
          : REGISTER_UI_TEXT.BUTTONS.SUBMIT}
      </Button>
    </>
  );
};
