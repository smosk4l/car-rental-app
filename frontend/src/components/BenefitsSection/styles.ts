import styled, { keyframes } from 'styled-components';

// Animations
export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const scaleIn = keyframes`
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
export const Section = styled.section`
  padding: 5rem 0;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  animation: ${fadeIn} 0.6s ease-out;
`;

export const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray800};
  margin-bottom: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 3rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.gray600};
  max-width: 42rem;
  margin: 0 auto;
  line-height: 1.75;
`;

export const Grid = styled.div`
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

export const Card = styled.div<{ delay: number }>`
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

export const CardContent = styled.div`
  padding: 2rem;
  text-align: center;
`;

export const IconContainer = styled.div`
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

export const IconStyled = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  width: 2rem;
  height: 2rem;
`;

export const BenefitTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray800};
  margin-bottom: 1rem;
`;

export const BenefitDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.75;
`;
