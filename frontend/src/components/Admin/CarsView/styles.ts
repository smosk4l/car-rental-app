import styled from 'styled-components';
import { TableCell } from '@/components/Table';
import { spin } from '@/styles/animations';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.xl};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderContent = styled.div``;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: -0.025em;
  margin: 0;
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.gray600};
  margin: ${({ theme }) => theme.spaces.xs} 0 0 0;
`;

export const SearchSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaces.sm};
`;

export const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 24rem;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spaces.sm};
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: ${({ theme }) => theme.colors.gray500};
  pointer-events: none;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spaces.sm} ${({ theme }) => theme.spaces.md};
  padding-left: ${({ theme }) => theme.spaces.xl};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.gray900};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: ${({ theme }) => theme.radii.md};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray400};
  }
`;

export const TableContainer = styled.div`
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  overflow: hidden;
`;

export const CarInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaces.md};
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.gray100};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const AvatarFallback = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray200};
  color: ${({ theme }) => theme.colors.gray600};
`;

export const CarDetails = styled.div``;

export const CarName = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.gray900};
`;

export const CarMeta = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray600};
`;

export const MonoCell = styled(TableCell)`
  font-family: monospace;
`;

export const PriceCell = styled(TableCell)`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const ActionsCell = styled(TableCell)`
  width: 70px;
`;

export const Badge = styled.span<{
  variant?: 'default' | 'success' | 'danger' | 'secondary' | 'outline';
}>`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => theme.spaces.xs} ${({ theme }) => theme.spaces.sm};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border-radius: ${({ theme }) => theme.radii.md};

  ${({ variant, theme }) => {
    switch (variant) {
      case 'success':
        return `
          background-color: ${theme.colors.success}15;
          color: ${theme.colors.success};
        `;
      case 'danger':
        return `
          background-color: ${theme.colors.danger}15;
          color: ${theme.colors.danger};
        `;
      case 'secondary':
        return `
          background-color: ${theme.colors.gray200};
          color: ${theme.colors.gray700};
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${theme.colors.gray700};
          border: 1px solid ${theme.colors.gray300};
        `;
      default:
        return `
          background-color: ${theme.colors.primary}15;
          color: ${theme.colors.primary};
        `;
    }
  }}
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  background: none;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray700};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}40;
  }
`;

export const DropdownItem = styled.div<{ variant?: 'default' | 'danger' }>`
  color: ${({ theme, variant }) =>
    variant === 'danger' ? theme.colors.danger : theme.colors.gray900};
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spaces.md};
  padding: ${({ theme }) => theme.spaces['2xl']};
  min-height: 400px;
  color: ${({ theme }) => theme.colors.gray600};

  svg {
    animation: ${spin} 1s linear infinite;
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spaces.md};
  padding: ${({ theme }) => theme.spaces['2xl']};
  min-height: 400px;
  text-align: center;

  svg {
    color: ${({ theme }) => theme.colors.danger};
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.gray900};
    margin: 0;
  }

  p {
    color: ${({ theme }) => theme.colors.gray600};
    margin: 0;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spaces.md};
  padding: ${({ theme }) => theme.spaces['2xl']};
  min-height: 400px;
  text-align: center;
  border: 1px dashed ${({ theme }) => theme.colors.gray300};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.gray100};

  svg {
    color: ${({ theme }) => theme.colors.gray400};
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.gray900};
    margin: 0;
  }

  p {
    color: ${({ theme }) => theme.colors.gray600};
    margin: 0;
  }
`;
