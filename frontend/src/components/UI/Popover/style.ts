import styled, { keyframes } from 'styled-components';
import * as PopoverPrimitive from '@radix-ui/react-popover';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const zoomIn = keyframes`
  from {
    transform: scale(0.95);
  }
  to {
    transform: scale(1);
  }
`;

const zoomOut = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.95);
  }
`;

const slideInFromTop = keyframes`
  from {
    transform: translateY(-0.5rem);
  }
  to {
    transform: translateY(0);
  }
`;

const slideInFromBottom = keyframes`
  from {
    transform: translateY(0.5rem);
  }
  to {
    transform: translateY(0);
  }
`;

const slideInFromLeft = keyframes`
  from {
    transform: translateX(-0.5rem);
  }
  to {
    transform: translateX(0);
  }
`;

const slideInFromRight = keyframes`
  from {
    transform: translateX(0.5rem);
  }
  to {
    transform: translateX(0);
  }
`;

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
