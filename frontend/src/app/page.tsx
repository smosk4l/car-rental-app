'use client';

import React from 'react';
import styled from 'styled-components';
import Navigation from '@/components/Navigation/Navigation';
import HeroSection from '@/components/HeroSection/HeroSection';
import FeaturedCars from '@/components/FeaturedCars/FeaturedCars';
import BenefitsSection from '@/components/BenefitsSection/BenefitsSection';
import TestimonialsSection from '@/components/TestimonialsSection/TestimonialsSection';
import FooterComponent from '@/components/Footer/Footer';

// Styled Components
const LandingContainer = styled.div`
  min-height: 100vh;
`;

const Landing = () => {
  return (
    <LandingContainer>
      <Navigation />
      <HeroSection />
      <FeaturedCars />
      <BenefitsSection />
      <TestimonialsSection />
      <FooterComponent />
    </LandingContainer>
  );
};

export default Landing;
