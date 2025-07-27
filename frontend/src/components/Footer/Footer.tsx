import React from 'react';
import {
  Footer,
  FooterContainer,
  FooterGrid,
  FooterSection,
  FooterSubtitle,
  FooterDescription,
  FooterLinks,
  FooterLink,
  FooterText,
  FooterDivider,
  CopyrightText,
} from './styles';

const FooterComponent = () => {
  return (
    <Footer>
      <FooterContainer>
        <FooterGrid>
          <FooterSection>
            <FooterSubtitle>DriveElite</FooterSubtitle>
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
  );
};

export default FooterComponent;
