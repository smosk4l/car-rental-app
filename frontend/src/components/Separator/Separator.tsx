import * as React from 'react';
import { StyledSeparator } from './styles';

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ orientation = 'horizontal', decorative = true, ...props }, ref) => (
    <StyledSeparator
      ref={ref}
      role={decorative ? 'presentation' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      orientation={orientation}
      {...props}
    />
  )
);

Separator.displayName = 'Separator';

export { Separator };