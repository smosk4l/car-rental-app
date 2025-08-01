'use client';

import React from 'react';
import {
  AuthContainer,
  AuthCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Form,
} from './styles';

interface AuthFormProps {
  title: string;
  description: string;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  links: React.ReactNode;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  title,
  description,
  onSubmit,
  children,
  links,
}) => {
  return (
    <AuthContainer>
      <AuthCard>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form onSubmit={onSubmit}>
            {children}
          </Form>
          {links}
        </CardContent>
      </AuthCard>
    </AuthContainer>
  );
};