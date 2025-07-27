import { usePathname } from 'next/navigation';
import { Menu, X, Bell } from 'lucide-react';
import { ICON_SIZES } from '@/constants/admin';
import { getCurrentPageTitle } from '@/utils/navigation';
import {
  Header,
  HeaderContent,
  HeaderLeft,
  MenuButton,
  PageTitle,
  HeaderRight,
  NotificationButton,
  NotificationBadge,
  ViewSiteLink,
} from '../styles';

interface AdminHeaderProps {
  sidebarOpen: boolean;
  onMenuToggle: () => void;
}

export const AdminHeader = ({
  sidebarOpen,
  onMenuToggle,
}: AdminHeaderProps) => {
  const pathname = usePathname();
  const pageTitle = getCurrentPageTitle(pathname);

  return (
    <Header>
      <HeaderContent>
        <HeaderLeft>
          <MenuButton onClick={onMenuToggle}>
            {sidebarOpen ? (
              <X
                style={{ width: ICON_SIZES.large, height: ICON_SIZES.large }}
              />
            ) : (
              <Menu
                style={{ width: ICON_SIZES.large, height: ICON_SIZES.large }}
              />
            )}
          </MenuButton>
          <PageTitle>{pageTitle}</PageTitle>
        </HeaderLeft>

        <HeaderRight>
          <NotificationButton>
            <Bell
              style={{ width: ICON_SIZES.medium, height: ICON_SIZES.medium }}
            />
            <NotificationBadge />
          </NotificationButton>
          <ViewSiteLink href="/">View Site</ViewSiteLink>
        </HeaderRight>
      </HeaderContent>
    </Header>
  );
};
