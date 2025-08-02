import styled, { css, keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownTrigger = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font: inherit;
  color: inherit;
  
  &:focus {
    outline: none;
  }
`;

export const DropdownContent = styled.div<{ isOpen: boolean; align?: 'left' | 'right' }>`
  position: absolute;
  top: 100%;
  ${({ align }) => align === 'right' ? 'right: 0;' : 'left: 0;'}
  z-index: 50;
  min-width: 8rem;
  margin-top: ${({ theme }) => theme.spaces.xs};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: ${({ theme }) => theme.spaces.xs};
  
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform: ${({ isOpen }) => (isOpen ? 'scale(1)' : 'scale(0.95)')};
  transform-origin: top ${({ align }) => align === 'right' ? 'right' : 'left'};
  transition: all 0.2s ease;
  
  ${({ isOpen }) => isOpen && css`
    animation: ${fadeIn} 0.2s ease;
  `}
`;

export const DropdownItem = styled.button<{ variant?: 'default' | 'danger' }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.spaces.xs} ${({ theme }) => theme.spaces.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme, variant }) => 
    variant === 'danger' ? theme.colors.danger : theme.colors.gray900};
  background: none;
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme, variant }) => 
      variant === 'danger' ? theme.colors.danger + '10' : theme.colors.gray100};
    color: ${({ theme, variant }) => 
      variant === 'danger' ? theme.colors.danger : theme.colors.gray900};
  }
  
  &:focus {
    outline: none;
    background-color: ${({ theme }) => theme.colors.gray100};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  svg {
    margin-right: ${({ theme }) => theme.spaces.sm};
    width: 16px;
    height: 16px;
  }
`;

export const DropdownSeparator = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray200};
  margin: ${({ theme }) => theme.spaces.xs} 0;
`;

export const DropdownLabel = styled.div`
  padding: ${({ theme }) => theme.spaces.xs} ${({ theme }) => theme.spaces.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.gray600};
`;