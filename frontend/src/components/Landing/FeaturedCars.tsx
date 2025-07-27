'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/UI/Button';
import { Card, CardContent } from '@/components/UI/Card';
import { Badge } from '@/components/UI/Badge';
import { Star, Users, Fuel, Zap } from 'lucide-react';
// import luxurySedan from '@/assets/car-luxury-sedan.jpg';
// import sportsCar from '@/assets/car-sports.jpg';
// import suvCar from '@/assets/car-suv.jpg';

// Styled Components
const SectionContainer = styled.section`
  padding: 5rem 0; /* py-20 */
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.gray100} 0%,
    ${({ theme }) => theme.colors.white} 100%
  );
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem; /* px-4 */
`;

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 4rem; /* mb-16 */
  animation: fadeIn 0.6s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MainHeading = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 1.5rem; /* mb-6 */

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
  }
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.gray600};
  max-width: 512px; /* max-w-2xl */
  margin: 0 auto;
`;

const CarGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem; /* gap-8 */

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const CarCard = styled(Card)<{ $animationDelay?: string }>`
  overflow: hidden;
  border: none;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all 0.3s ease;
  animation: scaleIn 0.6s ease-out;
  animation-delay: ${({ $animationDelay }) => $animationDelay || '0s'};
  animation-fill-mode: both;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.xl};
    transform: scale(1.05);
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 16rem; /* h-64 */

  &:hover img {
    transform: scale(1.1);
  }
`;

const CarImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const CategoryBadge = styled(Badge)`
  position: absolute;
  top: 1rem; /* top-4 */
  left: 1rem; /* left-4 */
  background-color: rgba(255, 255, 255, 0.9);
  color: ${({ theme }) => theme.colors.primary};
`;

const RatingContainer = styled.div`
  position: absolute;
  top: 1rem; /* top-4 */
  right: 1rem; /* right-4 */
  display: flex;
  align-items: center;
  gap: 0.25rem; /* space-x-1 */
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: ${({ theme }) => theme.radii.full};
  padding: 0.25rem 0.75rem; /* px-3 py-1 */
`;

const RatingText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const CarTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.5rem; /* mb-2 */
`;

const SpecsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem; /* space-x-4 */
  color: ${({ theme }) => theme.colors.gray600};
  margin-bottom: 1rem; /* mb-4 */
`;

const SpecItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem; /* space-x-1 */
`;

const SpecText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const FeaturesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem; /* gap-2 */
  margin-bottom: 1.5rem; /* mb-6 */
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PriceText = styled.div`
  span:first-child {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.gray900};
  }

  span:last-child {
    color: ${({ theme }) => theme.colors.gray600};
  }
`;

const CenterContainer = styled.div`
  text-align: center;
  margin-top: 3rem; /* mt-12 */
`;

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
              color: '#007bff',
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
