'use client';

import * as React from 'react';
import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'hero'
    | 'premium'
    | 'cta';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

// Styled Button Component
const StyledButton = styled.button<{ $variant?: string; $size?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  border: 1px solid transparent;
  outline: none;

  &:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 2px ${({ theme }) => theme.colors.primary}40,
      0 0 0 4px ${({ theme }) => theme.colors.primary}20;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  /* SVG styling */
  svg {
    pointer-events: none;
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }

  /* Size variants */
  ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return `
          height: 2.25rem; /* h-9 */
          border-radius: 0.375rem; /* rounded-md */
          padding: 0 0.75rem; /* px-3 */
        `;
      case 'lg':
        return `
          height: 2.75rem; /* h-11 */
          border-radius: 0.375rem; /* rounded-md */
          padding: 0 2rem; /* px-8 */
        `;
      case 'icon':
        return `
          height: 2.5rem; /* h-10 */
          width: 2.5rem; /* w-10 */
          padding: 0;
        `;
      default:
        return `
          height: 2.5rem; /* h-10 */
          padding: 0.5rem 1rem; /* px-4 py-2 */
        `;
    }
  }}

  /* Variant styles */
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'destructive':
        return `
          background-color: ${theme.colors.danger};
          color: ${theme.colors.white};
          box-shadow: ${theme.shadows.md};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.danger}cc;
          }
        `;
      case 'outline':
        return `
          border-color: ${theme.colors.gray300};
          background-color: ${theme.colors.white};
          color: ${theme.colors.gray700};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.gray100};
            color: ${theme.colors.gray800};
          }
        `;
      case 'secondary':
        return `
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.white};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.gray600};
          }
        `;
      case 'ghost':
        return `
          background-color: transparent;
          color: ${theme.colors.gray700};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.gray100};
            color: ${theme.colors.gray800};
          }
        `;
      case 'link':
        return `
          background-color: transparent;
          color: ${theme.colors.primary};
          text-decoration: underline;
          text-underline-offset: 4px;
          &:hover:not(:disabled) {
            text-decoration: underline;
          }
        `;
      case 'hero':
        return `
          background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryDark});
          color: ${theme.colors.white};
          font-weight: ${theme.fontWeights.semibold};
          box-shadow: ${theme.shadows.lg};
          transition: all 0.3s ease;
          &:hover:not(:disabled) {
            box-shadow: ${theme.shadows.xl};
            transform: translateY(-1px);
          }
        `;
      case 'premium':
        return `
          background-color: ${theme.colors.dark};
          color: ${theme.colors.white};
          box-shadow: ${theme.shadows.md};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.gray800};
          }
        `;
      case 'cta':
        return `
          background-color: ${theme.colors.warning};
          color: ${theme.colors.dark};
          font-weight: ${theme.fontWeights.semibold};
          box-shadow: ${theme.shadows.lg};
          transition: all 0.3s ease;
          &:hover:not(:disabled) {
            background-color: ${theme.colors.warning}cc;
            box-shadow: ${theme.shadows.xl};
            transform: scale(1.05);
          }
        `;
      default:
        return `
          background-color: ${theme.colors.primary};
          color: ${theme.colors.white};
          box-shadow: ${theme.shadows.md};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryDark};
          }
        `;
    }
  }}
`;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'default', children, ...props }, ref) => {
    return (
      <StyledButton ref={ref} $variant={variant} $size={size} {...props}>
        {children}
      </StyledButton>
    );
  }
);
Button.displayName = 'Button';

export { Button };
