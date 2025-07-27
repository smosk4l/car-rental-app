'use client';

import styled from 'styled-components';
import Link from 'next/link';

export const RegisterContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    to bottom right,
    ${({ theme }) => theme.colors.gray100},
    ${({ theme }) => theme.colors.gray200}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spaces.md};
`;

export const RegisterCard = styled.div`
  width: 100%;
  max-width: 28rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  overflow: hidden;
`;

export const CardHeader = styled.div`
  padding: ${({ theme }) => theme.spaces.xl} ${({ theme }) => theme.spaces.xl}
    ${({ theme }) => theme.spaces.lg};
  text-align: center;
`;

export const CardTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.gray900};
  margin: 0 0 ${({ theme }) => theme.spaces.sm} 0;
`;

export const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.gray600};
  margin: 0;
`;

export const CardContent = styled.div`
  padding: 0 ${({ theme }) => theme.spaces.xl} ${({ theme }) => theme.spaces.xl};
`;

export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.md};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.sm};
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spaces.md};

  /* Ensure grid items don't overflow */
  > * {
    min-width: 0;
  }

  /* Ensure inputs within grid items are responsive */
  input {
    width: 100%;
    box-sizing: border-box;
  }
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.spaces.md};
  text-align: center;
  padding: ${({ theme }) => theme.spaces.sm};
  background-color: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.2);
  border-radius: ${({ theme }) => theme.radii.md};
`;

export const SuccessMessage = styled.div`
  color: ${({ theme }) => theme.colors.success || '#28a745'};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.spaces.md};
  text-align: center;
  padding: ${({ theme }) => theme.spaces.sm};
  background-color: rgba(40, 167, 69, 0.1);
  border: 1px solid rgba(40, 167, 69, 0.2);
  border-radius: ${({ theme }) => theme.radii.md};
`;

export const LinksSection = styled.div`
  margin-top: ${({ theme }) => theme.spaces.xl};
  text-align: center;
`;

export const LinkText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray600};
  margin: 0 0 ${({ theme }) => theme.spaces.md} 0;
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    text-decoration: underline;
  }
`;

export const BackLink = styled(Link)`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray600};
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    text-decoration: underline;
  }
`;
