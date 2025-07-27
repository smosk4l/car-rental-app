import styled from 'styled-components';
import { Theme } from '@/styles/theme';

// Constants for consistent styling
const INPUT_TRANSITION =
  'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out';
const FOCUS_RING_OPACITY = '20';

// Helper function for focus ring color
const getFocusRingColor = (theme: Theme, hasError: boolean) =>
  `${hasError ? theme.colors.danger : theme.colors.primary}${FOCUS_RING_OPACITY}`;

// Helper function for border color
const getBorderColor = (theme: Theme, hasError: boolean, isFocused = false) => {
  if (hasError) return theme.colors.danger;
  if (isFocused) return theme.colors.primary;
  return theme.colors.gray300;
};

export const InputContainer = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.xs};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.gray700};
`;

export const StyledInput = styled.input<{ $hasError?: boolean }>`
  padding: ${({ theme }) => `${theme.spaces.sm} ${theme.spaces.md}`};
  border: 1px solid
    ${({ theme, $hasError }) => getBorderColor(theme, !!$hasError)};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  background-color: ${({ theme }) => theme.colors.white};
  transition: ${INPUT_TRANSITION};

  &:focus {
    outline: none;
    border-color: ${({ theme, $hasError }) =>
      getBorderColor(theme, !!$hasError, true)};
    box-shadow: 0 0 0 3px
      ${({ theme, $hasError }) => getFocusRingColor(theme, !!$hasError)};
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
