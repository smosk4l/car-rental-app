import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import { Button } from '@/components/UI/Button';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const glassmorphism = `
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const HeroContainer = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary}E6,
    ${({ theme }) => theme.colors.primaryDark}99
  );
`;

export const BackgroundContainer = styled.div`
  position: absolute;
  inset: 0;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.colors.gray900}E6,
      ${({ theme }) => theme.colors.gray800}99
    );
  }
`;

export const BackgroundImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ContentContainer = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
`;

export const MainContent = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  animation: ${fadeIn} 0.8s ease-out;
`;

export const MainHeading = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['5xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.white};
  line-height: 1.1;

  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
`;

export const AccentText = styled.span`
  display: block;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.warning},
    ${({ theme }) => theme.colors.warning}CC
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: rgba(255, 255, 255, 0.9);
  max-width: 512px;
  margin: 0 auto;

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  padding-top: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

export const SearchFormContainer = styled.div`
  margin-top: 4rem;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  animation: ${slideUp} 0.8s ease-out 0.3s both;
`;

export const SearchCard = styled.div`
  ${glassmorphism}
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.xl};
`;

export const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const SearchField = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  ${glassmorphism}
  border-radius: 0.5rem;
  padding: 1rem;
`;

export const FieldContent = styled.div`
  flex: 1;
`;

export const FieldLabel = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.25rem;
`;

export const FieldInput = styled.input`
  width: 100%;
  background: transparent;
  color: ${({ theme }) => theme.colors.white};
  border: none;
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }
`;

export const HeroButton = styled(Button)`
  font-size: 1.125rem;
  padding: 1.5rem 2rem;
`;

export const OutlineButton = styled(Button)`
  font-size: 1.125rem;
  padding: 1.5rem 2rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
  color: white;
`;

export const SearchButton = styled(Button)`
  height: 100%;
  padding: 1rem 0;
`;

export const IconWrapper = styled.span`
  margin-left: 0.5rem;
  width: 1.25rem;
  height: 1.25rem;
`;

export const SearchIcon = styled.span`
  width: 1.25rem;
  height: 1.25rem;
  color: #fbbf24;
`;
