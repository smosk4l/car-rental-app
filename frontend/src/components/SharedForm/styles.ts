import styled from 'styled-components';
import Link from 'next/link';

export const AuthContainer = styled.div`
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

export const AuthCard = styled.div`
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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.lg};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.xs};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.gray700};
`;

export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spaces.sm} ${({ theme }) => theme.spaces.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.gray900};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: ${({ theme }) => theme.radii.md};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray100};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray400};
  }
`;

export const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.danger};
  margin-top: ${({ theme }) => theme.spaces.xs};
`;

export const Button = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spaces.sm} ${({ theme }) => theme.spaces.lg};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primary}dd;
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Alert = styled.div<{ type: 'error' | 'success' }>`
  padding: ${({ theme }) => theme.spaces.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border-radius: ${({ theme }) => theme.radii.md};
  margin-bottom: ${({ theme }) => theme.spaces.md};
  
  ${({ theme, type }) =>
    type === 'error'
      ? `
    background-color: ${theme.colors.danger}15;
    color: ${theme.colors.danger};
    border: 1px solid ${theme.colors.danger}30;
  `
      : `
    background-color: ${theme.colors.success}15;
    color: ${theme.colors.success};
    border: 1px solid ${theme.colors.success}30;
  `}
`;

export const LinksContainer = styled.div`
  margin-top: ${({ theme }) => theme.spaces.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.md};
  text-align: center;
`;

export const LinkText = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary}cc;
    text-decoration: underline;
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaces.md};
  margin: ${({ theme }) => theme.spaces.md} 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.gray300};
  }
`;

export const DividerText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray500};
`;

export const FormRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spaces.md};
  
  > * {
    flex: 1;
  }
`;