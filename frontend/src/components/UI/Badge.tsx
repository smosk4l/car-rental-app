'use client';

import * as React from 'react';
import styled from 'styled-components';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

// Styled Badge Component
const StyledBadge = styled.div<{ $variant?: string }>`
  display: inline-flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid;
  padding: 0.125rem 0.625rem; /* px-2.5 py-0.5 */
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  transition: all 0.2s ease-in-out;
  outline: none;

  &:focus {
    outline: none;
    box-shadow:
      0 0 0 2px ${({ theme }) => theme.colors.primary}40,
      0 0 0 4px ${({ theme }) => theme.colors.primary}20;
  }

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'secondary':
        return `
          border-color: transparent;
          background-color: #F0F5F8;
          color: ${theme.colors.white};
          &:hover {
            background-color: ${theme.colors.gray600};
          }
        `;
      case 'destructive':
        return `
          border-color: transparent;
          background-color: ${theme.colors.danger};
          color: ${theme.colors.white};
          &:hover {
            background-color: ${theme.colors.danger}cc;
          }
        `;
      case 'outline':
        return `
          border-color: ${theme.colors.gray300};
          background-color: transparent;
          color: ${theme.colors.gray700};
          &:hover {
            background-color: ${theme.colors.gray100};
          }
        `;
      default:
        return `
          border-color: transparent;
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.white};
          &:hover {
            background-color: ${theme.colors.secondary};
          }
        `;
    }
  }}
`;

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ variant = 'default', children, ...props }, ref) => (
    <StyledBadge ref={ref} $variant={variant} {...props}>
      {children}
    </StyledBadge>
  )
);
Badge.displayName = 'Badge';

export { Badge };
