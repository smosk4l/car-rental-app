import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const userRole = token?.role as string;
    const pathname = req.nextUrl.pathname;

    // Protect admin routes - only allow ADMIN users
    if (pathname.startsWith('/admin')) {
      if (userRole !== 'ADMIN') {
        // Redirect to home with a message about unauthorized access
        const url = new URL('/', req.url);
        url.searchParams.set('error', 'unauthorized');
        return NextResponse.redirect(url);
      }
    }

    // Redirect authenticated users from auth pages to appropriate dashboard
    if (pathname.startsWith('/auth/') && token) {
      const redirectUrl = userRole === 'ADMIN' ? '/admin' : '/';
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        // Allow access to auth pages for non-authenticated users
        if (pathname.startsWith('/auth/')) {
          return true;
        }

        // Require authentication for protected routes
        if (
          pathname.startsWith('/admin') ||
          pathname.startsWith('/dashboard')
        ) {
          return !!token;
        }

        // Allow public routes
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
};
