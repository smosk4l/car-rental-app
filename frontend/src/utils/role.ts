/**
 * Utility functions for role-based navigation and access control
 */

export type UserRole = 'USER' | 'ADMIN';

export const ROLE_ROUTES = {
  ADMIN: '/admin',
  USER: '/',
} as const;

/**
 * Get the default dashboard route for a user role
 */
export function getDefaultRouteForRole(role: UserRole): string {
  return ROLE_ROUTES[role] || ROLE_ROUTES.USER;
}

/**
 * Check if a user has access to a specific route based on their role
 */
export function hasRouteAccess(userRole: UserRole, route: string): boolean {
  // Admin routes (anything starting with /admin)
  if (route.startsWith('/admin')) {
    return userRole === 'ADMIN';
  }

  // Public routes that all authenticated users can access
  const publicRoutes = ['/', '/cars', '/reservations', '/profile'];

  return publicRoutes.some(
    publicRoute => route === publicRoute || route.startsWith(`${publicRoute}/`)
  );
}

/**
 * Redirect user to appropriate route based on role and requested route
 */
export function getRedirectRoute(
  userRole: UserRole,
  requestedRoute?: string,
  defaultRoute?: string
): string {
  // If a specific default route is provided, use it
  if (defaultRoute) {
    return defaultRoute;
  }

  // If a requested route is provided and user has access, use it
  if (requestedRoute && hasRouteAccess(userRole, requestedRoute)) {
    return requestedRoute;
  }

  // Fall back to role-based default
  return getDefaultRouteForRole(userRole);
}

/**
 * Check if user is admin
 */
export function isAdmin(role: string): boolean {
  return role === 'ADMIN';
}

/**
 * Check if user is regular user
 */
export function isUser(role: string): boolean {
  return role === 'USER';
}
