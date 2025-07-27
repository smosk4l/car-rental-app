'use client';

import React from 'react';
import { Button } from '@/components/UI/Button';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import {
  HeroContainer,
  BackgroundContainer,
  BackgroundImage,
  ContentContainer,
  MainContent,
  MainHeading,
  AccentText,
  Description,
  ButtonContainer,
  SearchFormContainer,
  SearchCard,
  SearchGrid,
  SearchField,
  FieldContent,
  FieldLabel,
  FieldInput,
} from './styles';

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
