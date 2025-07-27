'use client';

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
  HeroButton,
  OutlineButton,
  SearchButton,
  IconWrapper,
  SearchIcon,
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
            <HeroButton variant="hero" size="lg">
              Book Now
              <IconWrapper>
                <ArrowRight />
              </IconWrapper>
            </HeroButton>
            <OutlineButton variant="outline" size="lg">
              Browse Fleet
            </OutlineButton>
          </ButtonContainer>
        </MainContent>

        {/* Search Form */}
        <SearchFormContainer>
          <SearchCard>
            <SearchGrid>
              <SearchField>
                <SearchIcon>
                  <MapPin />
                </SearchIcon>
                <FieldContent>
                  <FieldLabel>Pickup Location</FieldLabel>
                  <FieldInput type="text" placeholder="Enter city or airport" />
                </FieldContent>
              </SearchField>

              <SearchField>
                <SearchIcon>
                  <Calendar />
                </SearchIcon>
                <FieldContent>
                  <FieldLabel>Pickup Date</FieldLabel>
                  <FieldInput type="date" />
                </FieldContent>
              </SearchField>

              <SearchField>
                <SearchIcon>
                  <Calendar />
                </SearchIcon>
                <FieldContent>
                  <FieldLabel>Return Date</FieldLabel>
                  <FieldInput type="date" />
                </FieldContent>
              </SearchField>

              <SearchButton variant="cta" size="lg">
                Search Cars
              </SearchButton>
            </SearchGrid>
          </SearchCard>
        </SearchFormContainer>
      </ContentContainer>
    </HeroContainer>
  );
};

export default HeroSection;
