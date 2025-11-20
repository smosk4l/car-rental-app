import {
  LayoutDashboard,
  Calendar,
  Users,
  Car,
  CreditCard,
  HelpCircle,
  Settings,
  MapPin,
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const ADMIN_NAVIGATION_ITEMS: NavigationItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Bookings', href: '/admin/bookings', icon: Calendar },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Cars', href: '/admin/cars', icon: Car },
  { label: 'Locations', href: '/admin/locations', icon: MapPin },
  { label: 'Payments', href: '/admin/payments', icon: CreditCard },
  { label: 'Support', href: '/admin/support', icon: HelpCircle },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export const ADMIN_CONFIG = {
  APP_NAME: 'DriveElite',
  APP_SUBTITLE: 'Admin Panel',
  DEFAULT_USER_NAME: 'Admin User',
  DEFAULT_USER_EMAIL: 'admin@driveelite.com',
  DEFAULT_USER_INITIALS: 'AD',
} as const;

export const ICON_SIZES = {
  small: '1rem',
  medium: '1.25rem',
  large: '1.5rem',
  xlarge: '2rem',
} as const;
