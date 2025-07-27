'use client';

import { useState } from 'react';
import { Menu, X, Car } from 'lucide-react';
import Link from 'next/link';
import {
  NavContainer,
  Container,
  NavContent,
  LogoLink,
  LogoIcon,
  LogoText,
  DesktopNav,
  NavLink,
  DesktopActions,
  DashboardButton,
  AdminButton,
  MobileMenuButton,
  MobileMenu,
  MobileMenuContent,
  MobileNavLink,
  MobileActions,
  MobileDashboardButton,
  MobileAdminButton,
} from './styles';

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
