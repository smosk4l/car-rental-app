'use client';

import { Shield, Clock, DollarSign, Phone, Award, MapPin } from 'lucide-react';
import {
  Section,
  Container,
  Header,
  Title,
  Subtitle,
  Grid,
  Card,
  CardContent,
  IconContainer,
  IconStyled,
  BenefitTitle,
  BenefitDescription,
} from './styles';

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
