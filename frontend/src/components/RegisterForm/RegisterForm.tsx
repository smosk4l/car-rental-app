'use client';

import React from 'react';
import { useRegisterForm } from '@/hooks/useRegisterForm';
import { REGISTER_UI_TEXT } from '@/constants/ui';
import { AuthForm, FormField, Button, Alert, LinksContainer, LinkText, FormRow } from '@/components/SharedForm';

const RegisterForm: React.FC = () => {
  const {
    register,
    formState: { errors },
    isLoading,
    error,
    success,
    onSubmit,
  } = useRegisterForm();

  return (
    <AuthForm
      title={REGISTER_UI_TEXT.TITLE}
      description={REGISTER_UI_TEXT.DESCRIPTION}
      onSubmit={onSubmit}
      links={
        <LinksContainer>
          <div>
            {REGISTER_UI_TEXT.LINKS.HAVE_ACCOUNT}{' '}
            <LinkText href="/auth/login">
              {REGISTER_UI_TEXT.LINKS.SIGN_IN}
            </LinkText>
          </div>
          <LinkText href="/">
            {REGISTER_UI_TEXT.LINKS.BACK_HOME}
          </LinkText>
        </LinksContainer>
      }
    >
      {error && <Alert type="error">{error}</Alert>}
      {success && <Alert type="success">{success}</Alert>}

      <FormRow>
        <FormField
          name="firstName"
          label={REGISTER_UI_TEXT.LABELS.FIRST_NAME}
          placeholder={REGISTER_UI_TEXT.PLACEHOLDERS.FIRST_NAME}
          register={register}
          error={errors.firstName}
          disabled={isLoading}
        />
        <FormField
          name="lastName"
          label={REGISTER_UI_TEXT.LABELS.LAST_NAME}
          placeholder={REGISTER_UI_TEXT.PLACEHOLDERS.LAST_NAME}
          register={register}
          error={errors.lastName}
          disabled={isLoading}
        />
      </FormRow>

      <FormField
        name="email"
        label={REGISTER_UI_TEXT.LABELS.EMAIL}
        type="email"
        placeholder={REGISTER_UI_TEXT.PLACEHOLDERS.EMAIL}
        register={register}
        error={errors.email}
        disabled={isLoading}
        autoComplete="email"
      />

      <FormField
        name="password"
        label={REGISTER_UI_TEXT.LABELS.PASSWORD}
        type="password"
        placeholder={REGISTER_UI_TEXT.PLACEHOLDERS.PASSWORD}
        register={register}
        error={errors.password}
        disabled={isLoading}
        autoComplete="new-password"
      />

      <FormField
        name="confirmPassword"
        label={REGISTER_UI_TEXT.LABELS.CONFIRM_PASSWORD}
        type="password"
        placeholder={REGISTER_UI_TEXT.PLACEHOLDERS.CONFIRM_PASSWORD}
        register={register}
        error={errors.confirmPassword}
        disabled={isLoading}
        autoComplete="new-password"
      />

      <Button type="submit" disabled={isLoading}>
        {isLoading
          ? REGISTER_UI_TEXT.BUTTONS.SUBMITTING
          : REGISTER_UI_TEXT.BUTTONS.SUBMIT}
      </Button>
    </AuthForm>
  );
};

export default RegisterForm;