import styled from 'styled-components';
import { fadeInUp, scaleIn } from '@/styles/animations';

// Reusable container with max-width
export const Container = styled.div<{ $padding?: string }>`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ $padding }) => $padding || '0 1rem'};
`;

// Generic section wrapper
export const Section = styled.section<{ $gradient?: boolean }>`
  padding: 3rem 0;
  ${({ $gradient, theme }) =>
    $gradient &&
    `background: linear-gradient(to bottom, ${theme.colors.primary}1A, ${theme.colors.gray100});`}
`;

// Header
export const Header = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  background-color: ${({ theme }) => theme.colors.white};
  
  ${Container} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
  }
`;

// Flexible text components
export const Text = styled.p<{ 
  $size?: 'sm' | 'md' | 'lg' | 'xl'; 
  $weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  $color?: string;
  $align?: string;
}>`
  font-size: ${({ theme, $size = 'md' }) => theme.fontSizes[$size]};
  font-weight: ${({ theme, $weight = 'normal' }) => theme.fontWeights[$weight]};
  color: ${({ theme, $color }) => $color || theme.colors.gray600};
  text-align: ${({ $align }) => $align || 'left'};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

// Heading component
export const Heading = styled.h1<{ $level?: 1 | 2 | 3; $mb?: string }>`
  font-size: ${({ theme, $level = 1 }) => 
    $level === 1 ? theme.fontSizes['4xl'] : 
    $level === 2 ? theme.fontSizes['2xl'] : 
    theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: ${({ $mb }) => $mb || '1rem'};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ $level = 1 }) => $level === 1 ? '3rem' : undefined};
  }
`;

// Hero content wrapper
export const HeroContent = styled.div`
  max-width: 48rem;
  margin: 0 auto 2rem;
  text-align: center;
  animation: ${fadeInUp} 0.6s ease-out;
`;

// Input wrapper with icon support
export const InputWrapper = styled.div<{ $hasIcon?: boolean }>`
  position: relative;
  
  svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.gray500};
    width: 1.25rem;
    height: 1.25rem;
  }
  
  input {
    width: 100%;
    height: 3rem;
    padding-left: ${({ $hasIcon }) => $hasIcon ? '2.5rem' : '1rem'};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    border-radius: ${({ theme }) => theme.radii.lg};
    outline: none;
    transition: all 0.2s;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray400};
    }
  }
  
  select {
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: ${({ theme }) => theme.radii.lg};
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    font-size: ${({ theme }) => theme.fontSizes.md};
    background-color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
    }
    
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      width: 200px;
    }
  }
`;

// Flex wrapper
export const Flex = styled.div<{ 
  $gap?: string; 
  $direction?: 'row' | 'column';
  $align?: string;
  $justify?: string;
  $wrap?: boolean;
  $responsive?: boolean;
}>`
  display: flex;
  gap: ${({ $gap }) => $gap || '1rem'};
  flex-direction: ${({ $direction }) => $direction || 'column'};
  align-items: ${({ $align }) => $align || 'stretch'};
  justify-content: ${({ $justify }) => $justify || 'flex-start'};
  flex-wrap: ${({ $wrap }) => $wrap ? 'wrap' : 'nowrap'};
  
  ${({ $responsive, theme }) => $responsive && `
    @media (min-width: ${theme.breakpoints.sm}) {
      flex-direction: row;
    }
  `}
`;

// Grid wrapper
export const Grid = styled.div<{ $cols?: number }>`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(${({ $cols = 2 }) => Math.min($cols, 2)}, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(${({ $cols = 3 }) => $cols}, 1fr);
  }
`;

// Card component
export const Card = styled.div`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all 0.3s ease;
  animation: ${scaleIn} 0.6s ease-out;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.xl};
    transform: translateY(-4px);
  }
`;

// Image container
export const ImageBox = styled.div`
  position: relative;
  height: 12rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

// Badge component
export const Badge = styled.span<{ $variant?: 'primary' | 'secondary'; $position?: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme, $variant }) => 
    $variant === 'secondary' ? theme.fontSizes.xs : theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  
  ${({ theme, $variant = 'primary' }) =>
    $variant === 'primary'
      ? `
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
  `
      : `
    background-color: ${theme.colors.gray200};
    color: ${theme.colors.gray700};
    font-weight: ${theme.fontWeights.medium};
  `}
  
  ${({ $position }) => $position === 'absolute' && `
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
  `}
`;

// Page wrapper
export const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray100};
`;

// Card content wrapper
export const CardBody = styled.div`
  padding: 1.5rem;
`;

// Description with line clamp
export const Description = styled(Text)`
  margin: 1rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

// Specs grid
export const SpecsGrid = styled(Grid)`
  gap: 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: 1rem;
  
  span {
    color: ${({ theme }) => theme.colors.gray600};
  }
`;

// Features wrapper
export const FeaturesRow = styled(Flex)`
  margin-bottom: 1.5rem;
`;

// Price section
export const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
`;

// Icon wrapper for consistent sizing
export const Icon = styled.span<{ $size?: string; $color?: string; $fill?: boolean }>`
  display: inline-flex;
  width: ${({ $size }) => $size || '1rem'};
  height: ${({ $size }) => $size || '1rem'};
  
  svg {
    width: 100%;
    height: 100%;
    color: ${({ theme, $color }) => $color || theme.colors.gray600};
    ${({ $fill, $color }) => $fill && `fill: ${$color};`}
  }
`;
