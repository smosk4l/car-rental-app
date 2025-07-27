'use client';

import * as React from 'react';
import { StyledTextarea } from './styles';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ ...props }, ref) => {
  return (
    <StyledTextarea
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
