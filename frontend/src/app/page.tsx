'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Navigation from '@/components/Landing/Navigation';
import HeroSection from '@/components/Landing/HeroSection';
import FeaturedCars from '@/components/Landing/FeaturedCars';
import BenefitsSection from '@/components/Landing/BenefitsSection';
import TestimonialsSection from '@/components/Landing/TestimonialsSection';

// Styled Components
const LandingContainer = styled.div`
  min-height: 100vh;
`;

const Footer = styled.footer`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 3rem 0; /* py-12 */
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem; /* px-4 */
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem; /* gap-8 */

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const FooterSection = styled.div``;

const FooterTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: 1rem; /* mb-4 */
`;

const FooterSubtitle = styled.h4`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: 1rem; /* mb-4 */
`;

const FooterDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem; /* mb-4 */
  line-height: ${({ theme }) => theme.lineHeights.normal};
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* space-y-2 */
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.8);
`;

const FooterDivider = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: 2rem; /* mt-8 */
  padding-top: 2rem; /* pt-8 */
  text-align: center;
`;

const CopyrightText = styled.p`
  color: rgba(255, 255, 255, 0.6);
`;

const Landing = () => {
  return (
    <LandingContainer>
      <Navigation />
      <HeroSection />
      <FeaturedCars />
      <BenefitsSection />
      <TestimonialsSection />

      {/* Footer */}
      <Footer>
        <FooterContainer>
          <FooterGrid>
            <FooterSection>
              <FooterTitle>DriveElite</FooterTitle>
              <FooterDescription>
                Premium car rentals for every journey. Experience luxury,
                reliability, and exceptional service.
              </FooterDescription>
            </FooterSection>

            <FooterSection>
              <FooterSubtitle>Quick Links</FooterSubtitle>
              <FooterLinks>
                <FooterLink href="/fleet">Fleet</FooterLink>
                <FooterLink href="/locations">Locations</FooterLink>
                <FooterLink href="/about">About Us</FooterLink>
                <FooterLink href="/contact">Contact</FooterLink>
              </FooterLinks>
            </FooterSection>

            <FooterSection>
              <FooterSubtitle>Support</FooterSubtitle>
              <FooterLinks>
                <FooterLink href="/help">Help Center</FooterLink>
                <FooterLink href="/terms">Terms of Service</FooterLink>
                <FooterLink href="/privacy">Privacy Policy</FooterLink>
                <FooterText>24/7 Support</FooterText>
              </FooterLinks>
            </FooterSection>

            <FooterSection>
              <FooterSubtitle>Contact</FooterSubtitle>
              <FooterLinks>
                <FooterText>1-800-DRIVE-ELITE</FooterText>
                <FooterText>support@driveelite.com</FooterText>
                <FooterText>Available 24/7</FooterText>
              </FooterLinks>
            </FooterSection>
          </FooterGrid>

          <FooterDivider>
            <CopyrightText>
              &copy; 2024 DriveElite. All rights reserved.
            </CopyrightText>
          </FooterDivider>
        </FooterContainer>
      </Footer>
    </LandingContainer>
  );
};

export default Landing;
