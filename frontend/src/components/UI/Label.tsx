'use client';

import * as React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1;
  color: ${({ theme }) => theme.colors.dark};

  &:has(+ :disabled) {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, ...props }, ref) => (
    <StyledLabel ref={ref} {...props}>
      {children}
    </StyledLabel>
  )
);

Label.displayName = 'Label';

export { Label };
