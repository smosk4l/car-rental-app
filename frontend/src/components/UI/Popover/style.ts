import styled from 'styled-components';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import {
  fadeIn,
  fadeOut,
  zoomIn,
  zoomOut,
  slideDownSmall as slideInFromTop,
  slideUpSmall as slideInFromBottom,
  slideInFromLeft,
  slideInFromRight
} from '@/styles/animations';

export const StyledPopoverContent = styled(PopoverPrimitive.Content)`
  z-index: 50;
  width: 18rem;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  color: ${({ theme }) => theme.colors.dark};
  box-shadow: ${({ theme }) => theme.shadows.md};
  outline: none;

  /* Animation for open state */
  &[data-state='open'] {
    animation:
      ${fadeIn} 150ms ease-out,
      ${zoomIn} 150ms ease-out;
  }

  /* Animation for closed state */
  &[data-state='closed'] {
    animation:
      ${fadeOut} 150ms ease-in,
      ${zoomOut} 150ms ease-in;
  }

  /* Slide animations based on side */
  &[data-side='bottom'][data-state='open'] {
    animation:
      ${fadeIn} 150ms ease-out,
      ${zoomIn} 150ms ease-out,
      ${slideInFromTop} 150ms ease-out;
  }

  &[data-side='top'][data-state='open'] {
    animation:
      ${fadeIn} 150ms ease-out,
      ${zoomIn} 150ms ease-out,
      ${slideInFromBottom} 150ms ease-out;
  }

  &[data-side='left'][data-state='open'] {
    animation:
      ${fadeIn} 150ms ease-out,
      ${zoomIn} 150ms ease-out,
      ${slideInFromRight} 150ms ease-out;
  }

  &[data-side='right'][data-state='open'] {
    animation:
      ${fadeIn} 150ms ease-out,
      ${zoomIn} 150ms ease-out,
      ${slideInFromLeft} 150ms ease-out;
  }
`;
