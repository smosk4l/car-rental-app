'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Header from '@/components/Header';

interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spaces.lg};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spaces.xl};
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spaces.lg};
  margin-top: ${({ theme }) => theme.spaces.xl};
`;

const Feature = styled.div`
  padding: ${({ theme }) => theme.spaces.lg};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.gray100};
  text-align: center;

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spaces.md};
  }
`;

const Hero = styled.section`
  text-align: center;
  padding: ${({ theme }) => theme.spaces['3xl']} 0;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary}20,
    ${({ theme }) => theme.colors.secondary}20
  );
  border-radius: ${({ theme }) => theme.radii.xl};
  margin-bottom: ${({ theme }) => theme.spaces.xl};
`;

const CTAButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spaces.md} ${({ theme }) => theme.spaces.xl};
  border-radius: ${({ theme }) => theme.radii.lg};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-top: ${({ theme }) => theme.spaces.lg};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Still loading

    if (session?.user) {
      const user = session.user as SessionUser;
      if (user.role === 'ADMIN') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/user');
      }
    }
  }, [session, status, router]);

  // Show loading or redirect for authenticated users
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (session?.user) {
    return <div>Redirecting...</div>;
  }

  return (
    <>
      <Header />
      <Container>
        <Hero>
          <Title>Welcome to Car Rental App</Title>
          <p>Find and rent the perfect car for your journey</p>
          <CTAButton>Browse Cars</CTAButton>
        </Hero>

        <Features>
          <Feature>
            <h3>🚗 Wide Selection</h3>
            <p>Choose from economy cars to luxury vehicles</p>
          </Feature>
          <Feature>
            <h3>💰 Best Prices</h3>
            <p>Competitive rates with transparent pricing</p>
          </Feature>
          <Feature>
            <h3>📱 Easy Booking</h3>
            <p>Book your car in just a few clicks</p>
          </Feature>
          <Feature>
            <h3>🔒 Secure Payment</h3>
            <p>Safe and secure payment processing</p>
          </Feature>
          <Feature>
            <h3>🌟 Quality Service</h3>
            <p>Excellent customer service and support</p>
          </Feature>
          <Feature>
            <h3>📍 Multiple Locations</h3>
            <p>Pick up and drop off at convenient locations</p>
          </Feature>
        </Features>
      </Container>
    </>
  );
}
