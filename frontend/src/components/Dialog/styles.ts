import styled, { keyframes, css } from 'styled-components';

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

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.96);
  }
`;

export const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.8);

  ${({ isOpen }) =>
    isOpen
      ? css`
          animation: ${fadeIn} 200ms ease-out;
        `
      : css`
          animation: ${fadeOut} 200ms ease-in;
        `}
`;

export const Content = styled.div<{ isOpen: boolean }>`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;
  display: grid;
  width: 90vw;
  max-width: 32rem;
  max-height: 85vh;
  overflow-y: auto;
  gap: ${({ theme }) => theme.spaces.md};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spaces.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border-radius: ${({ theme }) => theme.radii.lg};

  ${({ isOpen }) =>
    isOpen
      ? css`
          animation: ${slideIn} 200ms ease-out;
          animation-fill-mode: forwards;
        `
      : css`
          animation: ${slideOut} 200ms ease-in;
          animation-fill-mode: forwards;
        `}
`;

export const CloseButton = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.spaces.md};
  top: ${({ theme }) => theme.spaces.md};
  padding: ${({ theme }) => theme.spaces.xs};
  border-radius: ${({ theme }) => theme.radii.sm};
  opacity: 0.7;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray700};
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
    background-color: ${({ theme }) => theme.colors.gray100};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}40;
  }

  &:disabled {
    pointer-events: none;
  }
`;

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.xs};
  text-align: center;

  @media (min-width: 640px) {
    text-align: left;
  }
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column-reverse;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: flex-end;
    gap: ${({ theme }) => theme.spaces.sm};
  }
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.gray900};
  margin: 0;
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray600};
  margin: 0;
`;

export const TriggerButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
`;
