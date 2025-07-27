import styled, { css } from 'styled-components';
import { Button } from '@/components/UI/Button';
import Link from 'next/link';
import { theme } from '@/styles/theme';

// Mixins
const responsiveHidden = css`
  display: none;
  @media (min-width: ${theme.breakpoints.md}) {
    display: flex;
  }
`;

const mobileOnly = css`
  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const baseNavLinkStyles = css`
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: ${theme.fontWeights.medium};
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.white};
  }
`;

const baseButtonStyles = css`
  color: ${theme.colors.white};
  font-weight: ${theme.fontWeights.semibold};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${theme.shadows.lg};
  }
`;

export const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spaces.md};
`;

export const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${theme.spaces.sm};
  text-decoration: none;
`;

export const LogoIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${theme.radii.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.warning};
`;

export const LogoText = styled.span`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.white};
`;

export const DesktopNav = styled.div`
  ${responsiveHidden}
  gap: ${theme.spaces.xl};
`;

export const NavLink = styled(Link)`
  ${baseNavLinkStyles}
`;

export const DesktopActions = styled.div`
  ${responsiveHidden}
  gap: ${theme.spaces.md};
`;

export const ActionButton = styled(Button)<{ $isMobile?: boolean }>`
  ${baseButtonStyles}
  height: ${props => (props.$isMobile ? 'auto' : '2.25rem')};
  width: ${props => (props.$isMobile ? '100%' : 'auto')};
  border-radius: ${theme.radii.md};
  padding: ${props => (props.$isMobile ? '0.75rem' : `0 ${theme.spaces.sm}`)};
  background: ${props =>
    props.$isMobile
      ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryDark})`
      : theme.colors.warning};
`;

export const MobileMenuButton = styled.button`
  display: block;
  background: none;
  border: none;
  color: ${theme.colors.white};
  cursor: pointer;
  ${mobileOnly}
`;

export const MobileMenu = styled.div<{ $isOpen: boolean }>`
  ${mobileOnly}
  display: ${props => (props.$isOpen ? 'block' : 'none')};
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding: ${theme.spaces.md} 0;
  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const MobileMenuContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spaces.md};
`;

export const MobileNavLink = styled(Link)`
  ${baseNavLinkStyles}
  padding: ${theme.spaces.sm} ${theme.spaces.md};
`;

export const MobileActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spaces.sm};
  padding: ${theme.spaces.md};
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: ${theme.spaces.md};
`;
