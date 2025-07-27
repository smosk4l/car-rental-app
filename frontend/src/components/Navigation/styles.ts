import styled from 'styled-components';
import { Button } from '@/components/UI/Button';
import Link from 'next/link';
import { theme } from '@/styles/theme';

export const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
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
`;

export const LogoText = styled.span`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.white};
`;

export const DesktopNav = styled.div`
  display: none;
  align-items: center;
  gap: ${theme.spaces.xl};

  @media (min-width: ${theme.breakpoints.md}) {
    display: flex;
  }
`;

export const NavLink = styled(Link)`
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: ${theme.fontWeights.medium};
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.white};
  }
`;

export const DesktopActions = styled.div`
  display: none;
  align-items: center;
  gap: ${theme.spaces.md};

  @media (min-width: ${theme.breakpoints.md}) {
    display: flex;
  }
`;

export const DashboardButton = styled(Button)`
  color: ${theme.colors.white};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const AdminButton = styled(Button)`
  background: linear-gradient(
    135deg,
    ${theme.colors.primary},
    ${theme.colors.primaryDark}
  );
  color: ${theme.colors.white};
  font-weight: ${theme.fontWeights.semibold};
  height: 2.25rem;
  border-radius: ${theme.radii.md};
  padding: 0 ${theme.spaces.sm};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${theme.shadows.lg};
  }
`;

export const MobileMenuButton = styled.button`
  display: block;
  background: none;
  border: none;
  color: ${theme.colors.white};
  cursor: pointer;

  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

export const MobileMenu = styled.div<{ $isOpen: boolean }>`
  display: ${props => (props.$isOpen ? 'block' : 'none')};
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding: ${theme.spaces.md} 0;
  animation: fadeIn 0.2s ease-in-out;

  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }

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
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: ${theme.fontWeights.medium};
  padding: ${theme.spaces.sm} ${theme.spaces.md};
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.white};
  }
`;

export const MobileActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spaces.sm};
  padding: ${theme.spaces.md};
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: ${theme.spaces.md};
`;

export const MobileDashboardButton = styled(Button)`
  width: 100%;
  color: ${theme.colors.white};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const MobileAdminButton = styled(Button)`
  width: 100%;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary},
    ${theme.colors.primaryDark}
  );
  color: ${theme.colors.white};
  font-weight: ${theme.fontWeights.semibold};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${theme.shadows.lg};
  }
`;
