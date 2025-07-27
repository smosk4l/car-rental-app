'use client';

import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/Button/Button';
import {
  HeaderContainer,
  HeaderContent,
  Logo,
  NavActions,
  UserInfo,
  UserName,
  UserRole,
  LoginLink,
} from './styles';

interface ExtendedUser {
  name?: string | null;
  role?: string;
}

const Header: React.FC = () => {
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo href="/">🚗 Car Rental</Logo>

        <NavActions>
          {status === 'loading' ? (
            <span>Loading...</span>
          ) : session?.user ? (
            <UserInfo>
              <UserName>Welcome, {session.user.name}</UserName>
              <UserRole>{(session.user as ExtendedUser).role}</UserRole>
              <Button variant="secondary" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </UserInfo>
          ) : (
            <LoginLink href="/auth/login">
              <Button variant="primary" size="sm">
                Sign In
              </Button>
            </LoginLink>
          )}
        </NavActions>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
