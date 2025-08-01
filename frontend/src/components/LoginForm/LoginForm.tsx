'use client';

import React from 'react';
import { useLoginForm } from '@/hooks/useLoginForm';
import { UI_TEXT } from '@/constants/ui';
import { AuthForm, FormField, Button, Alert, LinksContainer, LinkText } from '@/components/SharedForm';

const LoginForm: React.FC = () => {
  const {
    register,
    formState: { errors },
    isLoading,
    error,
    onSubmit,
  } = useLoginForm();

  return (
    <AuthForm
      title={UI_TEXT.TITLE}
      description={UI_TEXT.DESCRIPTION}
      onSubmit={onSubmit}
      links={
        <LinksContainer>
          <div>
            {UI_TEXT.LINKS.NO_ACCOUNT}{' '}
            <LinkText href="/auth/register">
              {UI_TEXT.LINKS.SIGN_UP}
            </LinkText>
          </div>
          <LinkText href="/">
            {UI_TEXT.LINKS.BACK_HOME}
          </LinkText>
        </LinksContainer>
      }
    >
      {error && <Alert type="error">{error}</Alert>}

      <FormField
        name="email"
        label={UI_TEXT.LABELS.EMAIL}
        type="email"
        placeholder={UI_TEXT.PLACEHOLDERS.EMAIL}
        register={register}
        error={errors.email}
        disabled={isLoading}
        autoComplete="email"
      />

      <FormField
        name="password"
        label={UI_TEXT.LABELS.PASSWORD}
        type="password"
        placeholder={UI_TEXT.PLACEHOLDERS.PASSWORD}
        register={register}
        error={errors.password}
        disabled={isLoading}
        autoComplete="current-password"
      />

      <Button type="submit" disabled={isLoading}>
        {isLoading
          ? UI_TEXT.BUTTONS.SUBMITTING
          : UI_TEXT.BUTTONS.SUBMIT}
      </Button>
    </AuthForm>
  );
};

export default LoginForm;