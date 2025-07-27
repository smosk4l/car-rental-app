'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/UI/Button';
import { CardContent } from '@/components/UI/Card';
import { Badge } from '@/components/UI/Badge';
import { Star, Users, Fuel, Zap } from 'lucide-react';
import {
  SectionContainer,
  Container,
  HeaderContainer,
  MainHeading,
  Description,
  CarGrid,
  CarCard,
  ImageContainer,
  CarImage,
  CategoryBadge,
  RatingContainer,
  RatingText,
  CarTitle,
  SpecsContainer,
  SpecItem,
  SpecText,
  FeaturesContainer,
  PriceContainer,
  PriceText,
  CenterContainer,
} from './styles';

const cars = [
  {
    id: 1,
    name: 'BMW 5 Series',
    category: 'Luxury Sedan',
    image:
      'https://images.unsplash.com/photo-1592853625601-bb9d23da12fc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 89,
    rating: 4.9,
    features: ['5 Seats', 'Hybrid', 'Premium Interior'],
    specs: { passengers: 5, fuel: 'Hybrid', type: 'Automatic' },
  },
  {
    id: 2,
    name: 'Ferrari F8',
    category: 'Sports Car',
    image:
      'https://images.unsplash.com/photo-1592853625601-bb9d23da12fc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 299,
    rating: 5.0,
    features: ['2 Seats', 'V8 Engine', 'Racing Performance'],
    specs: { passengers: 2, fuel: 'Petrol', type: 'Manual' },
  },
  {
    id: 3,
    name: 'Range Rover Evoque',
    category: 'Luxury SUV',
    image:
      'https://images.unsplash.com/photo-1592853625601-bb9d23da12fc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 129,
    rating: 4.8,
    features: ['7 Seats', '4WD', 'Premium Comfort'],
    specs: { passengers: 7, fuel: 'Diesel', type: 'Automatic' },
  },
];

const FeaturedCars = () => {
  return (
    <SectionContainer>
      <Container>
        <HeaderContainer>
          <Badge
            variant="secondary"
            style={{
              color: '#021C3B',
              fontWeight: 600,
              padding: '0.5rem 1rem',
              marginBottom: '1rem',
              display: 'inline-block',
            }}
          >
            Featured Fleet
          </Badge>
          <MainHeading>Premium Vehicles for Every Journey</MainHeading>
          <Description>
            Choose from our carefully curated collection of luxury vehicles,
            each maintained to the highest standards for your comfort and
            safety.
          </Description>
        </HeaderContainer>

        <CarGrid>
          {cars.map((car, index) => (
            <CarCard key={car.id} $animationDelay={`${index * 0.1}s`}>
              <ImageContainer>
                <CarImage
                  src={car.image}
                  alt={car.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <CategoryBadge variant="secondary">
                  {car.category}
                </CategoryBadge>
                <RatingContainer>
                  <Star
                    style={{
                      width: '1rem',
                      height: '1rem',
                      fill: '#fbbf24',
                      color: '#fbbf24',
                    }}
                  />
                  <RatingText>{car.rating}</RatingText>
                </RatingContainer>
              </ImageContainer>

              <CardContent style={{ padding: '1.5rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <CarTitle>{car.name}</CarTitle>
                  <SpecsContainer>
                    <SpecItem>
                      <Users style={{ width: '1rem', height: '1rem' }} />
                      <SpecText>{car.specs.passengers}</SpecText>
                    </SpecItem>
                    <SpecItem>
                      <Fuel style={{ width: '1rem', height: '1rem' }} />
                      <SpecText>{car.specs.fuel}</SpecText>
                    </SpecItem>
                    <SpecItem>
                      <Zap style={{ width: '1rem', height: '1rem' }} />
                      <SpecText>{car.specs.type}</SpecText>
                    </SpecItem>
                  </SpecsContainer>
                </div>

                <FeaturesContainer>
                  {car.features.map((feature, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      style={{ fontSize: '0.75rem' }}
                    >
                      {feature}
                    </Badge>
                  ))}
                </FeaturesContainer>

                <PriceContainer>
                  <PriceText>
                    <span>${car.price}</span>
                    <span>/day</span>
                  </PriceText>
                  <Link href={`/cars/${car.id}/reserve`}>
                    <Button variant="cta" style={{ padding: '0 1.5rem' }}>
                      Reserve Now
                    </Button>
                  </Link>
                </PriceContainer>
              </CardContent>
            </CarCard>
          ))}
        </CarGrid>

        <CenterContainer>
          <Link href="/fleet">
            <Button variant="outline" size="lg" style={{ padding: '0 2rem' }}>
              View All Vehicles
            </Button>
          </Link>
        </CenterContainer>
      </Container>
    </SectionContainer>
  );
};

export default FeaturedCars;
