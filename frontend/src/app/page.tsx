'use client';

import { useSession } from 'next-auth/react';
import { Flex, Spinner } from '@chakra-ui/react';
import {
  HeroSection,
  SearchSection,
  FeaturedVehicles,
  Benefits,
  Testimonials,
  FAQ,
  Footer,
} from '@/components/LandingPage/index';

export default function HomePage() {
  const { status } = useSession();

  if (status === 'loading') {
    return (
      <Flex minH="100vh" alignItems="center" justifyContent="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <>
      <HeroSection />
      <SearchSection />
      <FeaturedVehicles />
      <Benefits />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
}
