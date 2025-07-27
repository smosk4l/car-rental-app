'use client';

import { Shield, Clock, DollarSign, Phone, Award, MapPin } from 'lucide-react';
import styled, { keyframes } from 'styled-components';

// Define color mappings for the icons
const iconColors = {
  green: '#16a34a',
  blue: '#2563eb',
  purple: '#9333ea',
  accent: '#f59e0b',
  primary: '#007bff',
  pink: '#ec4899',
};

const benefits = [
  {
    icon: DollarSign,
    title: 'No Hidden Fees',
    description:
      'Transparent pricing with all costs included upfront. No surprises at pickup or return.',
    color: iconColors.green,
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description:
      'Round-the-clock customer service and roadside assistance wherever your journey takes you.',
    color: iconColors.blue,
  },
  {
    icon: Shield,
    title: 'Comprehensive Insurance',
    description:
      'Full coverage protection included with every rental for complete peace of mind.',
    color: iconColors.purple,
  },
  {
    icon: Award,
    title: 'Premium Fleet',
    description:
      'Meticulously maintained vehicles from top brands, serviced to the highest standards.',
    color: iconColors.accent,
  },
  {
    icon: MapPin,
    title: 'Global Locations',
    description:
      'Pick up and drop off at over 500 locations worldwide with flexible arrangements.',
    color: iconColors.primary,
  },
  {
    icon: Phone,
    title: 'Instant Booking',
    description:
      'Reserve your vehicle in minutes with our streamlined booking process and instant confirmation.',
    color: iconColors.pink,
  },
];

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Styled Components
const Section = styled.section`
  padding: 5rem 0;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  animation: ${fadeIn} 0.6s ease-out;
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray800};
  margin-bottom: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.gray600};
  max-width: 42rem;
  margin: 0 auto;
  line-height: 1.75;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div<{ delay: number }>`
  border: none;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all 0.3s ease;
  animation: ${scaleIn} 0.6s ease-out;
  animation-delay: ${({ delay }) => delay * 0.1}s;
  animation-fill-mode: both;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.xl};
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 2rem;
  text-align: center;
`;

const IconContainer = styled.div`
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.gray100} 0%,
    ${({ theme }) => theme.colors.gray200} 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const IconStyled = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  width: 2rem;
  height: 2rem;
`;

const BenefitTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray800};
  margin-bottom: 1rem;
`;

const BenefitDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.75;
`;

const BenefitsSection = () => {
  return (
    <Section>
      <Container>
        <Header>
          <Title>Why Choose Our Service?</Title>
          <Subtitle>
            Experience the difference with our premium car rental service,
            designed to exceed your expectations at every step.
          </Subtitle>
        </Header>

        <Grid>
          {benefits.map((benefit, index) => (
            <Card key={index} delay={index}>
              <CardContent>
                <IconContainer>
                  <IconStyled color={benefit.color}>
                    <benefit.icon size={32} />
                  </IconStyled>
                </IconContainer>

                <BenefitTitle>{benefit.title}</BenefitTitle>

                <BenefitDescription>{benefit.description}</BenefitDescription>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default BenefitsSection;
