import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const FormContainer = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.radii.lg};
  box-shadow: ${theme.shadows.lg};
  border: none;
`;

export const FormHeader = styled.div`
  padding: ${theme.spaces['2xl']} ${theme.spaces['2xl']} ${theme.spaces.lg};
  border-bottom: 1px solid ${theme.colors.gray200};
`;

export const FormTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: ${theme.spaces.sm};
  margin: 0;
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.dark};
  font-family: ${theme.fonts.heading};

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: ${theme.colors.primary};
  }
`;

export const FormContent = styled.div`
  padding: ${theme.spaces['2xl']};
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spaces['2xl']};
`;

export const FormGrid = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spaces['2xl']};

  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(${props => props.columns || 2}, 1fr);
  }

  ${props =>
    props.columns === 4 &&
    `
    @media (min-width: ${theme.breakpoints.lg}) {
      grid-template-columns: repeat(4, 1fr);
    }
  `}
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spaces.sm};
`;

export const FormLabel = styled.label`
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.dark};
  font-family: ${theme.fonts.primary};
`;

export const FormInput = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: ${theme.spaces.sm} ${theme.spaces.md};
  border: 1px solid
    ${props => (props.hasError ? theme.colors.danger : theme.colors.gray300)};
  border-radius: ${theme.radii.md};
  font-size: ${theme.fontSizes.sm};
  font-family: ${theme.fonts.primary};
  background: ${theme.colors.white};
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.gray500};
  }
`;

export const FormTextarea = styled.textarea<{ hasError?: boolean }>`
  width: 100%;
  min-height: 100px;
  padding: ${theme.spaces.sm} ${theme.spaces.md};
  border: 1px solid
    ${props => (props.hasError ? theme.colors.danger : theme.colors.gray300)};
  border-radius: ${theme.radii.md};
  font-size: ${theme.fontSizes.sm};
  font-family: ${theme.fonts.primary};
  background: ${theme.colors.white};
  resize: vertical;
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.gray500};
  }
`;

export const FormSelect = styled.select<{ hasError?: boolean }>`
  width: 100%;
  padding: ${theme.spaces.sm} ${theme.spaces.md};
  border: 1px solid
    ${props => (props.hasError ? theme.colors.danger : theme.colors.gray300)};
  border-radius: ${theme.radii.md};
  font-size: ${theme.fontSizes.sm};
  font-family: ${theme.fonts.primary};
  background: ${theme.colors.white};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

export const FormCheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spaces.md};
`;

export const FormCheckbox = styled.input`
  width: 1rem;
  height: 1rem;
  margin-top: 0.125rem;
  accent-color: ${theme.colors.primary};
  cursor: pointer;
`;

export const FormCheckboxContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spaces.xs};
`;

export const FormDescription = styled.p`
  margin: 0;
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.gray600};
  line-height: ${theme.lineHeights.normal};
`;

export const FormError = styled.span`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.danger};
  font-weight: ${theme.fontWeights.medium};
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${theme.spaces.md};
  padding-top: ${theme.spaces['2xl']};
  border-top: 1px solid ${theme.colors.gray200};
`;

export const FormButton = styled.button<{ variant?: 'primary' | 'outline' }>`
  display: flex;
  align-items: center;
  gap: ${theme.spaces.sm};
  padding: ${theme.spaces.sm} ${theme.spaces.lg};
  border: ${props =>
    props.variant === 'outline' ? `1px solid ${theme.colors.gray300}` : 'none'};
  border-radius: ${theme.radii.md};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  font-family: ${theme.fonts.primary};
  background: ${props =>
    props.variant === 'outline' ? theme.colors.white : theme.colors.primary};
  color: ${props =>
    props.variant === 'outline' ? theme.colors.dark : theme.colors.white};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${props =>
      props.variant === 'outline'
        ? theme.colors.gray100
        : theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const LoadingSpinner = styled.div`
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
