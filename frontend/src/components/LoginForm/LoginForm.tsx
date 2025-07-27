'use client';

import React from 'react';
import { useLoginForm } from '@/hooks/useLoginForm';
import { LoginFormFields } from './LoginFormFields';
import { LoginFormLinks } from './LoginFormLinks';
import { UI_TEXT } from '@/constants/ui';
import {
  LoginContainer,
  LoginCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  LoginForm,
} from './styles';

const Login: React.FC = () => {
  const {
    register,
    formState: { errors },
    isLoading,
    error,
    onSubmit,
  } = useLoginForm();

  return (
    <LoginContainer>
      <LoginCard>
        <CardHeader>
          <CardTitle>{UI_TEXT.TITLE}</CardTitle>
          <CardDescription>{UI_TEXT.DESCRIPTION}</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm onSubmit={onSubmit}>
            <LoginFormFields
              register={register}
              errors={errors}
              isLoading={isLoading}
              error={error}
            />
          </LoginForm>
          <LoginFormLinks />
        </CardContent>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
