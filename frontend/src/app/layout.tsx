import type { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/registry';
import NextAuthProvider from '@/components/NextAuthProvider';
import { ChakraProvider } from '@/components/ChakraProvider';

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
          <ChakraProvider>
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </ChakraProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
