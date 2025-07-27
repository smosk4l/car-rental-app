import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  type UserRole,
  hasRouteAccess,
  getDefaultRouteForRole,
} from '@/utils/role';

// Type for extended session with role
type SessionWithRole = {
  user: {
    role: string;
  };
};

interface UseRoleRedirectOptions {
  requiredRole?: UserRole;
  fallbackRoute?: string;
  redirectUnauthenticated?: boolean;
}

/**
 * Hook for role-based navigation and access control
 */
export function useRoleRedirect(options: UseRoleRedirectOptions = {}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const {
    requiredRole,
    fallbackRoute,
    redirectUnauthenticated = true,
  } = options;

  useEffect(() => {
    if (status === 'loading') return;

    // Handle unauthenticated users
    if (!session) {
      if (redirectUnauthenticated) {
        router.push('/auth/login');
      }
      return;
    }

    const userRole = (session as unknown as SessionWithRole)?.user
      ?.role as UserRole;

    // If a specific role is required and user doesn't have it
    if (requiredRole && userRole !== requiredRole) {
      const redirectTo = fallbackRoute || getDefaultRouteForRole(userRole);
      router.push(redirectTo);
      return;
    }
  }, [
    session,
    status,
    router,
    requiredRole,
    fallbackRoute,
    redirectUnauthenticated,
  ]);

  return {
    session,
    status,
    userRole: (session as unknown as SessionWithRole)?.user?.role as UserRole,
    isLoading: status === 'loading',
    isAuthenticated: !!session,
  };
}

/**
 * Hook for checking if user has access to a specific route
 */
export function useRouteAccess(route: string) {
  const { data: session } = useSession();
  const userRole = (session as unknown as SessionWithRole)?.user
    ?.role as UserRole;

  return {
    hasAccess: session ? hasRouteAccess(userRole, route) : false,
    userRole,
    isAuthenticated: !!session,
  };
}

/**
 * Hook for role-based navigation helpers
 */
export function useRoleNavigation() {
  const { data: session } = useSession();
  const router = useRouter();
  const userRole = (session as unknown as SessionWithRole)?.user
    ?.role as UserRole;

  const navigateToRole = (role: UserRole) => {
    const route = getDefaultRouteForRole(role);
    router.push(route);
  };

  const navigateToUserDashboard = () => {
    if (userRole) {
      navigateToRole(userRole);
    }
  };

  const navigateToAdmin = () => {
    if (userRole === 'ADMIN') {
      router.push('/admin');
    }
  };

  const navigateToHome = () => {
    router.push('/');
  };

  return {
    navigateToRole,
    navigateToUserDashboard,
    navigateToAdmin,
    navigateToHome,
    userRole,
    canAccessAdmin: userRole === 'ADMIN',
  };
}
