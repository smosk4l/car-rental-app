import styled from 'styled-components';
import { Card } from '@/components/UI/Card';

export const SectionContainer = styled.section`
  padding: 5rem 0; /* py-20 */
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.gray100} 0%,
    ${({ theme }) => theme.colors.white} 100%
  );
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem; /* px-4 */
`;

export const HeaderContainer = styled.div`
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

export const MainHeading = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 1.5rem; /* mb-6 */

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
  }
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.gray600};
  max-width: 512px; /* max-w-2xl */
  margin: 0 auto;
`;

export const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem; /* gap-8 */
  max-width: 1152px; /* max-w-6xl */
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const TestimonialCard = styled(Card)<{ $animationDelay?: string }>`
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

export const StarsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem; /* space-x-1 */
  margin-bottom: 1.5rem; /* mb-6 */
`;

export const Quote = styled.blockquote`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.gray600};
  margin-bottom: 1.5rem; /* mb-6 */
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

export const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem; /* space-x-4 */
`;

export const AuthorInfo = styled.div``;

export const AuthorName = styled.h4`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.gray900};
`;

export const AuthorRole = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray600};
`;
