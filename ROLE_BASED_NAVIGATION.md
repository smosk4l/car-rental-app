# Role-Based Navigation System

This system provides comprehensive role-based authentication and navigation for the car rental application.

## Features

- ✅ Automatic role-based redirection after login
- ✅ Support for callback URLs from query parameters
- ✅ Custom redirect URLs
- ✅ Route access control
- ✅ Protected routes with middleware
- ✅ Type-safe role checking utilities

## User Roles

- **USER**: Regular customers who can browse cars and make reservations
- **ADMIN**: Administrators who can access admin panel and manage the system

## Default Routes

- **ADMIN** → `/admin` (Admin Dashboard)
- **USER** → `/` (Home Page)

## Usage Examples

### Basic Login with Role-Based Redirect

```typescript
import { useLoginForm } from '@/hooks/useLoginForm';

function LoginPage() {
  const { onSubmit, isLoading, error } = useLoginForm();
  
  // Automatically redirects:
  // - ADMIN users to /admin
  // - USER users to /
  // - Respects ?callbackUrl= query parameter
  
  return (
    <form onSubmit={onSubmit}>
      {/* form fields */}
    </form>
  );
}
```

### Custom Redirect After Login

```typescript
const { onSubmit } = useLoginForm({
  redirectUrl: '/dashboard', // Custom redirect for all users
  onSuccess: (userRole) => {
    console.log(`User logged in with role: ${userRole}`);
    // Custom logic after successful login
  }
});
```

### Role-Based Navigation

```typescript
import { useRoleNavigation } from '@/hooks/useRoleRedirect';

function NavigationComponent() {
  const {
    navigateToUserDashboard,
    navigateToAdmin,
    userRole,
    canAccessAdmin
  } = useRoleNavigation();
  
  return (
    <div>
      <button onClick={navigateToUserDashboard}>
        Go to My Dashboard
      </button>
      
      {canAccessAdmin && (
        <button onClick={navigateToAdmin}>
          Admin Panel
        </button>
      )}
    </div>
  );
}
```

### Route Access Control

```typescript
import { useRouteAccess } from '@/hooks/useRoleRedirect';

function ProtectedComponent() {
  const { hasAccess } = useRouteAccess('/admin/cars');
  
  if (!hasAccess) {
    return <div>Access denied</div>;
  }
  
  return <div>Protected content</div>;
}
```

### Protected Pages

```typescript
import { useRoleRedirect } from '@/hooks/useRoleRedirect';

function AdminOnlyPage() {
  const { isLoading } = useRoleRedirect({
    requiredRole: 'ADMIN',
    fallbackRoute: '/' // Redirect non-admin users here
  });
  
  if (isLoading) return <div>Loading...</div>;
  
  // Only ADMIN users will see this content
  return <AdminDashboard />;
}
```

## URL Parameters

The system supports callback URLs for flexible redirection:

```
/auth/login?callbackUrl=/admin/cars
```

After successful login, users will be redirected to the callback URL (if they have access).

## Route Protection

The middleware automatically protects routes:

- `/admin/*` - Only accessible by ADMIN users
- `/auth/*` - Redirects authenticated users to their dashboard
- Other routes - Public or protected based on configuration

## Utilities

### Role Utilities (`@/lib/roleUtils`)

```typescript
import { getDefaultRouteForRole, hasRouteAccess, isAdmin } from '@/lib/roleUtils';

// Get default route for a role
const adminRoute = getDefaultRouteForRole('ADMIN'); // '/admin'

// Check route access
const canAccess = hasRouteAccess('ADMIN', '/admin/cars'); // true

// Role checking
const userIsAdmin = isAdmin(userRole); // boolean
```

### Hooks

- `useLoginForm(options?)` - Enhanced login form with role-based redirect
- `useRoleRedirect(options)` - Automatic role-based page protection
- `useRouteAccess(route)` - Check access to specific routes
- `useRoleNavigation()` - Navigation helpers based on user role

## Security

- All role checks are performed server-side in middleware
- Client-side hooks are for UX only, not security
- JWT tokens contain role information
- Session validation happens on every protected route access

## File Structure

```
src/
├── hooks/
│   ├── useLoginForm.ts          # Enhanced login with role redirect
│   └── useRoleRedirect.ts       # Role-based navigation hooks
├── lib/
│   └── roleUtils.ts             # Role utility functions
├── middleware.ts                # Route protection middleware
└── app/
    ├── admin/
    │   └── page.tsx             # Protected admin dashboard
    └── auth/
        └── login/
            └── page.tsx         # Login page
```

## Migration Notes

If updating existing code:

1. Replace manual redirects in login forms with `useLoginForm()`
2. Add role checks to protected components using `useRoleRedirect()`
3. Use `useRoleNavigation()` for navigation buttons
4. Update middleware matcher to include your protected routes
