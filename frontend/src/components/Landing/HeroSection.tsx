'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Button } from '@/components/UI/Button';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';

// Styled Components
const HeroContainer = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary}E6,
    ${({ theme }) => theme.colors.primaryDark}99
  );
`;

const BackgroundContainer = styled.div`
  position: absolute;
  inset: 0;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.colors.gray900}E6,
      ${({ theme }) => theme.colors.gray800}99
    );
  }
`;

const BackgroundImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
`;

const MainContent = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  animation: fadeIn 0.8s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MainHeading = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['5xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.white};
  line-height: 1.1;

  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
`;

const AccentText = styled.span`
  display: block;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.warning},
    ${({ theme }) => theme.colors.warning}CC
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: rgba(255, 255, 255, 0.9);
  max-width: 512px;
  margin: 0 auto;

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  padding-top: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const SearchFormContainer = styled.div`
  margin-top: 4rem;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  animation: slideUp 0.8s ease-out 0.3s both;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SearchCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: ${({ theme }) => theme.shadows.xl};
`;

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const SearchField = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  padding: 1rem;
`;

const FieldContent = styled.div`
  flex: 1;
`;

const FieldLabel = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.25rem;
`;

const FieldInput = styled.input`
  width: 100%;
  background: transparent;
  color: ${({ theme }) => theme.colors.white};
  border: none;
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }
`;

const HeroSection = () => {
  return (
    <HeroContainer>
      {/* Background Image with Overlay */}
      <BackgroundContainer>
        <BackgroundImage
          src={
            'https://images.unsplash.com/photo-1592853625601-bb9d23da12fc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          alt="Hero background"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
      </BackgroundContainer>

      {/* Content */}
      <ContentContainer>
        <MainContent>
          <MainHeading>
            Drive Your
            <AccentText>Perfect Journey</AccentText>
          </MainHeading>

          <Description>
            Premium car rentals for every occasion. From luxury sedans to rugged
            SUVs, find your ideal vehicle with transparent pricing and 24/7
            support.
          </Description>

          <ButtonContainer>
            <Button
              variant="hero"
              size="lg"
              style={{ fontSize: '1.125rem', padding: '1.5rem 2rem' }}
            >
              Book Now{' '}
              <ArrowRight
                style={{
                  marginLeft: '0.5rem',
                  width: '1.25rem',
                  height: '1.25rem',
                }}
              />
            </Button>
            <Button
              variant="outline"
              size="lg"
              style={{
                fontSize: '1.125rem',
                padding: '1.5rem 2rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: 'white',
              }}
            >
              Browse Fleet
            </Button>
          </ButtonContainer>
        </MainContent>

        {/* Search Form */}
        <SearchFormContainer>
          <SearchCard>
            <SearchGrid>
              <SearchField>
                <MapPin
                  style={{
                    width: '1.25rem',
                    height: '1.25rem',
                    color: '#fbbf24',
                  }}
                />
                <FieldContent>
                  <FieldLabel>Pickup Location</FieldLabel>
                  <FieldInput type="text" placeholder="Enter city or airport" />
                </FieldContent>
              </SearchField>

              <SearchField>
                <Calendar
                  style={{
                    width: '1.25rem',
                    height: '1.25rem',
                    color: '#fbbf24',
                  }}
                />
                <FieldContent>
                  <FieldLabel>Pickup Date</FieldLabel>
                  <FieldInput type="date" />
                </FieldContent>
              </SearchField>

              <SearchField>
                <Calendar
                  style={{
                    width: '1.25rem',
                    height: '1.25rem',
                    color: '#fbbf24',
                  }}
                />
                <FieldContent>
                  <FieldLabel>Return Date</FieldLabel>
                  <FieldInput type="date" />
                </FieldContent>
              </SearchField>

              <Button
                variant="cta"
                size="lg"
                style={{ height: '100%', padding: '1rem 0' }}
              >
                Search Cars
              </Button>
            </SearchGrid>
          </SearchCard>
        </SearchFormContainer>
      </ContentContainer>
    </HeroContainer>
  );
};

export default HeroSection;
