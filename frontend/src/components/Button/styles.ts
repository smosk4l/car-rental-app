import styled from 'styled-components';

interface ButtonStyleProps {
  $variant?: 'primary' | 'secondary' | 'danger' | 'success';
  $size?: 'sm' | 'md' | 'lg';
  $fullWidth?: boolean;
}

export const StyledButton = styled.button<ButtonStyleProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'secondary':
        return `
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.white};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.gray600};
          }
        `;
      case 'danger':
        return `
          background-color: ${theme.colors.danger};
          color: ${theme.colors.white};
          &:hover:not(:disabled) {
            opacity: 0.9;
          }
        `;
      case 'success':
        return `
          background-color: ${theme.colors.success};
          color: ${theme.colors.white};
          &:hover:not(:disabled) {
            opacity: 0.9;
          }
        `;
      default:
        return `
          background-color: ${theme.colors.primary};
          color: ${theme.colors.white};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryDark};
          }
        `;
    }
  }}

  ${({ $size, theme }) => {
    switch ($size) {
      case 'sm':
        return `
          padding: ${theme.spaces.sm} ${theme.spaces.md};
          font-size: ${theme.fontSizes.sm};
        `;
      case 'lg':
        return `
          padding: ${theme.spaces.lg} ${theme.spaces.xl};
          font-size: ${theme.fontSizes.lg};
        `;
      default:
        return `
          padding: ${theme.spaces.md} ${theme.spaces.lg};
          font-size: ${theme.fontSizes.md};
        `;
    }
  }}

  ${({ $fullWidth }) =>
    $fullWidth &&
    `
    width: 100%;
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;
