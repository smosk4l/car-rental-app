import styled from 'styled-components';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { fadeIn, slideInFromTop, slideInFromBottom, slideOutToRight } from '@/styles/animations';

// Note: fadeOut animation for toast uses opacity 0.8 instead of standard 0
import { keyframes } from 'styled-components';
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0.8;
  }
`;

export const StyledToastViewport = styled(ToastPrimitives.Viewport)`
  position: fixed;
  top: 0;
  z-index: 100;
  display: flex;
  max-height: 100vh;
  width: 100%;
  flex-direction: column-reverse;
  padding: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    bottom: 0;
    right: 0;
    top: auto;
    flex-direction: column;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 420px;
  }
`;

export const StyledToast = styled(ToastPrimitives.Root)<{ $variant?: 'default' | 'destructive' }>`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  column-gap: 1rem;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  padding: 1.5rem;
  padding-right: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  transition: all 0.2s;
  pointer-events: auto;

  /* Base variant styles */
  ${({ $variant, theme }) => {
    if ($variant === 'destructive') {
      return `
        border-color: ${theme.colors.danger};
        background-color: ${theme.colors.danger};
        color: ${theme.colors.white};
      `;
    }
    return `
      background-color: ${theme.colors.white};
      color: ${theme.colors.dark};
    `;
  }}

  /* Swipe gestures */
  &[data-swipe='cancel'] {
    transform: translateX(0);
  }

  &[data-swipe='end'] {
    transform: translateX(var(--radix-toast-swipe-end-x));
  }

  &[data-swipe='move'] {
    transform: translateX(var(--radix-toast-swipe-move-x));
    transition: none;
  }

  /* Open/Close animations */
  &[data-state='open'] {
    animation:
      ${fadeIn} 200ms ease-out,
      ${slideInFromTop} 200ms ease-out;
  }

  &[data-state='closed'] {
    animation:
      ${fadeOut} 150ms ease-in,
      ${slideOutToRight} 150ms ease-in;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    &[data-state='open'] {
      animation:
        ${fadeIn} 200ms ease-out,
        ${slideInFromBottom} 200ms ease-out;
    }
  }

  &[data-swipe='end'] {
    animation: ${slideOutToRight} 150ms ease-in;
  }
`;

export const StyledToastAction = styled(ToastPrimitives.Action)`
  display: inline-flex;
  height: 2rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background-color: transparent;
  padding: 0 0.75rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: colors 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  ${StyledToast}[data-variant='destructive'] & {
    border-color: rgba(255, 255, 255, 0.4);

    &:hover {
      border-color: rgba(220, 53, 69, 0.3);
      background-color: ${({ theme }) => theme.colors.danger};
      color: ${({ theme }) => theme.colors.white};
    }

    &:focus {
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.danger};
    }
  }
`;

export const StyledToastClose = styled(ToastPrimitives.Close)`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0.25rem;
  color: ${({ theme }) => theme.colors.gray600};
  opacity: 0;
  transition: opacity 0.2s;
  border: none;
  background: transparent;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.dark};
  }

  &:focus {
    opacity: 1;
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }

  ${StyledToast}:hover & {
    opacity: 1;
  }

  ${StyledToast}[data-variant='destructive'] & {
    color: rgba(255, 255, 255, 0.7);

    &:hover {
      color: rgba(255, 255, 255, 1);
    }

    &:focus {
      box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.4);
    }
  }

  svg {
    height: 1rem;
    width: 1rem;
  }
`;

export const StyledToastTitle = styled(ToastPrimitives.Title)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

export const StyledToastDescription = styled(ToastPrimitives.Description)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  opacity: 0.9;
`;
