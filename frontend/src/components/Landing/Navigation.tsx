'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@/components/UI/Button';
import { Menu, X, Car } from 'lucide-react';
import Link from 'next/link';
import { theme } from '@/styles/theme';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spaces.md};
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${theme.spaces.sm};
  text-decoration: none;
`;

const LogoIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${theme.radii.lg};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled.span`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.white};
`;

const DesktopNav = styled.div`
  display: none;
  align-items: center;
  gap: ${theme.spaces.xl};

  @media (min-width: ${theme.breakpoints.md}) {
    display: flex;
  }
`;

const NavLink = styled(Link)`
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: ${theme.fontWeights.medium};
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.white};
  }
`;

const DesktopActions = styled.div`
  display: none;
  align-items: center;
  gap: ${theme.spaces.md};

  @media (min-width: ${theme.breakpoints.md}) {
    display: flex;
  }
`;

const DashboardButton = styled(Button)`
  color: ${theme.colors.white};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const AdminButton = styled(Button)`
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

const MobileMenuButton = styled.button`
  display: block;
  background: none;
  border: none;
  color: ${theme.colors.white};
  cursor: pointer;

  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileMenu = styled.div<{ $isOpen: boolean }>`
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

const MobileMenuContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spaces.md};
`;

const MobileNavLink = styled(Link)`
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: ${theme.fontWeights.medium};
  padding: ${theme.spaces.sm} ${theme.spaces.md};
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.white};
  }
`;

const MobileActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spaces.sm};
  padding: ${theme.spaces.md};
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: ${theme.spaces.md};
`;

const MobileDashboardButton = styled(Button)`
  width: 100%;
  color: ${theme.colors.white};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const MobileAdminButton = styled(Button)`
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

// ...existing code...

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Fleet', href: '/fleet' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <NavContainer>
      <Container>
        <NavContent>
          {/* Logo */}
          <LogoLink href="/">
            <LogoIcon>
              <Car className="h-6 w-6 text-white" />
            </LogoIcon>
            <LogoText>DriveElite</LogoText>
          </LogoLink>

          {/* Desktop Navigation */}
          <DesktopNav>
            {navItems.map(item => (
              <NavLink key={item.label} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </DesktopNav>

          {/* Desktop Actions */}
          <DesktopActions>
            <Link href="/dashboard">
              <DashboardButton>Dashboard</DashboardButton>
            </Link>
            <Link href="/admin">
              <AdminButton>Admin</AdminButton>
            </Link>
          </DesktopActions>

          {/* Mobile Menu Button */}
          <MobileMenuButton onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </MobileMenuButton>
        </NavContent>

        {/* Mobile Menu */}
        <MobileMenu $isOpen={isOpen}>
          <MobileMenuContent>
            {navItems.map(item => (
              <MobileNavLink
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </MobileNavLink>
            ))}
            <MobileActions>
              <Link href="/dashboard">
                <MobileDashboardButton>Dashboard</MobileDashboardButton>
              </Link>
              <Link href="/admin">
                <MobileAdminButton>Admin</MobileAdminButton>
              </Link>
            </MobileActions>
          </MobileMenuContent>
        </MobileMenu>
      </Container>
    </NavContainer>
  );
};

export default Navigation;
