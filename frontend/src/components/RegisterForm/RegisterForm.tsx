'use client';

import React from 'react';
import { useRegisterForm } from '@/hooks/useRegisterForm';
import { RegisterFormFields } from './RegisterFormFields';
import { RegisterFormLinks } from './RegisterFormLinks';
import { REGISTER_UI_TEXT } from '@/constants/ui';
import {
  RegisterContainer,
  RegisterCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  RegisterForm,
} from './styles';

const Register: React.FC = () => {
  const {
    register,
    formState: { errors },
    isLoading,
    error,
    success,
    onSubmit,
  } = useRegisterForm();

  return (
    <RegisterContainer>
      <RegisterCard>
        <CardHeader>
          <CardTitle>{REGISTER_UI_TEXT.TITLE}</CardTitle>
          <CardDescription>{REGISTER_UI_TEXT.DESCRIPTION}</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm onSubmit={onSubmit}>
            <RegisterFormFields
              register={register}
              errors={errors}
              isLoading={isLoading}
              error={error}
              success={success}
            />
          </RegisterForm>
          <RegisterFormLinks />
        </CardContent>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register;
