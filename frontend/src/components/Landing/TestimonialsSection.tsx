'use client';

import React from 'react';
import styled from 'styled-components';
import { Card, CardContent } from '@/components/UI/Card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/UI/Avatar';
import { Star } from 'lucide-react';

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

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem; /* gap-8 */
  max-width: 1152px; /* max-w-6xl */
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TestimonialCard = styled(Card)<{ $animationDelay?: string }>`
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

const StarsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem; /* space-x-1 */
  margin-bottom: 1.5rem; /* mb-6 */
`;

const Quote = styled.blockquote`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.gray600};
  margin-bottom: 1.5rem; /* mb-6 */
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem; /* space-x-4 */
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.h4`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const AuthorRole = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray600};
`;

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
