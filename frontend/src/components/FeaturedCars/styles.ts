import styled from 'styled-components';
import Image from 'next/image';
import { Card } from '@/components/UI/Card';
import { Badge } from '@/components/UI/Badge';
import { fadeInUp, fadeInScale } from '@/styles/animations';

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
  animation: ${fadeInUp} 0.6s ease-out;
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

export const CarGrid = styled.div`
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

export const CarCard = styled(Card)<{ $animationDelay?: string }>`
  overflow: hidden;
  border: none;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all 0.3s ease;
  animation: ${fadeInScale} 0.6s ease-out;
  animation-delay: ${({ $animationDelay }) => $animationDelay || '0s'};
  animation-fill-mode: both;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.xl};
    transform: scale(1.05);
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 16rem; /* h-64 */

  &:hover img {
    transform: scale(1.1);
  }
`;

export const CarImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

export const CategoryBadge = styled(Badge)`
  position: absolute;
  top: 1rem; /* top-4 */
  left: 1rem; /* left-4 */
  background-color: rgba(255, 255, 255, 0.9);
  color: ${({ theme }) => theme.colors.primary};
`;

export const RatingContainer = styled.div`
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

export const RatingText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.gray900};
`;

export const CarTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.5rem; /* mb-2 */
`;

export const SpecsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem; /* space-x-4 */
  color: ${({ theme }) => theme.colors.gray600};
  margin-bottom: 1rem; /* mb-4 */
`;

export const SpecItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem; /* space-x-1 */
`;

export const SpecText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const FeaturesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem; /* gap-2 */
  margin-bottom: 1.5rem; /* mb-6 */
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PriceText = styled.div`
  span:first-child {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.gray900};
  }

  span:last-child {
    color: ${({ theme }) => theme.colors.gray600};
  }
`;

export const CenterContainer = styled.div`
  text-align: center;
  margin-top: 3rem; /* mt-12 */
`;
