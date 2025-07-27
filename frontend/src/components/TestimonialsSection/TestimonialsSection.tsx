'use client';

import React from 'react';
import { CardContent } from '@/components/UI/Card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/UI/Avatar';
import { Star } from 'lucide-react';
import {
  SectionContainer,
  Container,
  HeaderContainer,
  MainHeading,
  Description,
  TestimonialsGrid,
  TestimonialCard,
  StarsContainer,
  Quote,
  AuthorContainer,
  AuthorInfo,
  AuthorName,
  AuthorRole,
} from './styles';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Business Executive',
    avatar: 'SJ',
    rating: 5,
    content:
      'Exceptional service! The BMW I rented was immaculate and the booking process was seamless. Perfect for my business trip to San Francisco.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Wedding Photographer',
    avatar: 'MC',
    rating: 5,
    content:
      'Used their luxury sedan for a wedding shoot. The car was gorgeous and the team was incredibly helpful with the timing and setup.',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Travel Blogger',
    avatar: 'ER',
    rating: 5,
    content:
      'Best car rental experience ever! From the Range Rover to the customer service, everything exceeded my expectations. Highly recommended!',
  },
];

const TestimonialsSection = () => {
  return (
    <SectionContainer>
      <Container>
        <HeaderContainer>
          <MainHeading>What Our Customers Say</MainHeading>
          <Description>
            Don&apos;t just take our word for it. Here&apos;s what our satisfied
            customers have to say about their experience with us.
          </Description>
        </HeaderContainer>

        <TestimonialsGrid>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              $animationDelay={`${index * 0.2}s`}
            >
              <CardContent style={{ padding: '2rem' }}>
                <StarsContainer>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      style={{
                        width: '1.25rem',
                        height: '1.25rem',
                        fill: '#fbbf24',
                        color: '#fbbf24',
                      }}
                    />
                  ))}
                </StarsContainer>

                <Quote>&ldquo;{testimonial.content}&rdquo;</Quote>

                <AuthorContainer>
                  <Avatar style={{ width: '3rem', height: '3rem' }}>
                    <AvatarImage src="" />
                    <AvatarFallback
                      style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        fontWeight: 600,
                      }}
                    >
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <AuthorInfo>
                    <AuthorName>{testimonial.name}</AuthorName>
                    <AuthorRole>{testimonial.role}</AuthorRole>
                  </AuthorInfo>
                </AuthorContainer>
              </CardContent>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </Container>
    </SectionContainer>
  );
};

export default TestimonialsSection;
