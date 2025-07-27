import { ADMIN_NAVIGATION_ITEMS, type NavigationItem } from '@/constants/admin';

export const getCurrentPageTitle = (pathname: string): string => {
  const currentItem = ADMIN_NAVIGATION_ITEMS.find(
    (item: NavigationItem) => item.href === pathname
  );
  return currentItem?.label || 'Dashboard';
};
