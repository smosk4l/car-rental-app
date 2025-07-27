import styled from 'styled-components';
import Link from 'next/link';
import { Button } from '@/components/Button/Button';

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
`;

export const Sidebar = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: 16rem;
  height: 100vh;
  background: white;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: ${props =>
    props.$isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease-in-out;

  @media (min-width: 1024px) {
    transform: translateX(0);
  }
`;

export const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
`;

export const LogoIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background: #007bff;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const LogoText = styled.div``;

export const LogoTitle = styled.h1`
  font-size: 1.125rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
`;

export const LogoSubtitle = styled.p`
  font-size: 0.75rem;
  color: #718096;
  margin: 0;
`;

export const Navigation = styled.nav`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const NavLink = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;

  ${props =>
    props.$isActive
      ? `
    background: #007bff;
    color: white;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  `
      : `
    color: #718096;
    &:hover {
      color: #1a202c;
      background: #f7fafc;
      transform: scale(1.05);
    }
  `}
`;

export const NavIcon = styled.div`
  margin-right: 0.75rem;
  width: 1.25rem;
  height: 1.25rem;
`;

export const BottomSection = styled.div`
  padding: 1rem;
  border-top: 1px solid #e2e8f0;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

export const UserDetails = styled.div`
  flex: 1;
`;

export const UserName = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: #1a202c;
  margin: 0;
`;

export const UserEmail = styled.p`
  font-size: 0.75rem;
  color: #718096;
  margin: 0;
`;

export const SignOutButton = styled(Button)`
  width: 100%;
  justify-content: flex-start;
  color: #718096;
  background: transparent;
  border: none;

  &:hover {
    color: #1a202c;
    background: #f7fafc;
  }
`;

export const MainContent = styled.div`
  @media (min-width: 1024px) {
    margin-left: 16rem;
  }
`;

export const Header = styled.header`
  background: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid #e2e8f0;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const MenuButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.375rem;
  color: #718096;
  background: transparent;
  border: none;
  cursor: pointer;
  margin-right: 1rem;

  &:hover {
    color: #1a202c;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const PageTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const NotificationButton = styled.button`
  position: relative;
  padding: 0.5rem;
  border-radius: 0.375rem;
  color: #718096;
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    color: #1a202c;
  }
`;

export const NotificationBadge = styled.div`
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  width: 0.75rem;
  height: 0.75rem;
  background: #007bff;
  border-radius: 50%;
`;

export const ViewSiteLink = styled(Link)`
  font-size: 0.875rem;
  color: #718096;
  text-decoration: none;

  &:hover {
    color: #1a202c;
  }
`;

export const Main = styled.main`
  padding: 1.5rem;
`;

export const MobileOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 40;
  display: ${props => (props.$isOpen ? 'block' : 'none')};

  @media (min-width: 1024px) {
    display: none;
  }
`;
