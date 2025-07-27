'use client';

import { useSidebar } from '@/hooks/useSidebar';
import {
  AdminLogo,
  AdminNavigation,
  AdminUserSection,
  AdminHeader,
} from './components';
import {
  Container,
  Sidebar,
  SidebarContent,
  MainContent,
  Main,
  MobileOverlay,
} from './styles';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const sidebar = useSidebar();

  return (
    <Container>
      {/* Sidebar */}
      <Sidebar $isOpen={sidebar.isOpen}>
        <SidebarContent>
          <AdminLogo />
          <AdminNavigation onLinkClick={sidebar.close} />
          <AdminUserSection />
        </SidebarContent>
      </Sidebar>

      {/* Main Content */}
      <MainContent>
        <AdminHeader
          sidebarOpen={sidebar.isOpen}
          onMenuToggle={sidebar.toggle}
        />
        <Main>{children}</Main>
      </MainContent>

      {/* Mobile Overlay */}
      <MobileOverlay $isOpen={sidebar.isOpen} onClick={sidebar.close} />
    </Container>
  );
};

export default AdminLayout;
