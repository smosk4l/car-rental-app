import { usePathname } from 'next/navigation';
import { ADMIN_NAVIGATION_ITEMS, ICON_SIZES } from '@/constants/admin';
import { Navigation, NavLink, NavIcon } from '../styles';

interface AdminNavigationProps {
  onLinkClick: () => void;
}

export const AdminNavigation = ({ onLinkClick }: AdminNavigationProps) => {
  const pathname = usePathname();

  return (
    <Navigation>
      {ADMIN_NAVIGATION_ITEMS.map(item => {
        const isActive = pathname === item.href;
        return (
          <NavLink
            key={item.label}
            href={item.href}
            $isActive={isActive}
            onClick={onLinkClick}
          >
            <NavIcon>
              <item.icon
                style={{
                  width: ICON_SIZES.medium,
                  height: ICON_SIZES.medium,
                }}
              />
            </NavIcon>
            {item.label}
          </NavLink>
        );
      })}
    </Navigation>
  );
};
