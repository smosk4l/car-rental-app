import type { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/registry';
import NextAuthProvider from '@/components/NextAuthProvider';
import QueryProvider from '@/components/QueryProvider';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Car Rental App',
  description: 'Rent cars easily with our modern car rental platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <QueryProvider>
            <StyledComponentsRegistry>
              {children}
              <Toaster position="top-right" richColors />
            </StyledComponentsRegistry>
          </QueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
