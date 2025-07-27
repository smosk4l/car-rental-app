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
  ActionButton,
  MobileMenuButton,
  MobileMenu,
  MobileMenuContent,
  MobileNavLink,
  MobileActions,
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
          <LogoLink href="/">
            <LogoIcon>
              <Car color="#ffffff" />
            </LogoIcon>
            <LogoText>DriveElite</LogoText>
          </LogoLink>

          <DesktopNav>
            {navItems.map(item => (
              <NavLink key={item.label} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </DesktopNav>

          <DesktopActions>
            <Link href="/auth/login">
              <ActionButton>Login</ActionButton>
            </Link>
          </DesktopActions>

          <MobileMenuButton onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </MobileMenuButton>
        </NavContent>

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
              <Link href="/auth/login">
                <ActionButton $isMobile>Login</ActionButton>
              </Link>
            </MobileActions>
          </MobileMenuContent>
        </MobileMenu>
      </Container>
    </NavContainer>
  );
};

export default Navigation;
