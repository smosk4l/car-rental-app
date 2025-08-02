import styled from 'styled-components';
import Input from '@/components/Input/Input';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.xl};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.md};

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0;
  }
`;

export const HeaderContent = styled.div``;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.gray900};
  margin: 0;
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.gray600};
  margin: ${({ theme }) => theme.spaces.xs} 0 0 0;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spaces.md};

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;
`;

export const CardContent = styled.div`
  padding: ${({ theme }) => theme.spaces.xl};
`;

export const CardHeader = styled.div`
  padding: ${({ theme }) => theme.spaces.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`;

export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.gray900};
  margin: 0;
`;

export const StatCard = styled(Card)``;

export const StatContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StatInfo = styled.div``;

export const StatLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.gray600};
  margin: 0;
`;

export const StatValue = styled.p`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.gray900};
  margin: ${({ theme }) => theme.spaces.xs} 0 0 0;
`;

export const IconWrapper = styled.div<{ color?: string }>`
  width: 32px;
  height: 32px;
  color: ${({ color, theme }) => color || theme.colors.primary};
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;

  @media (min-width: 768px) {
    width: 320px;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spaces.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.gray500};
  width: 16px;
  height: 16px;
  pointer-events: none;
`;

export const SearchInput = styled(Input)`
  padding-left: ${({ theme }) => theme.spaces.xl};
  width: 100%;
`;

export const TableContainer = styled(Card)``;

export const TableHeaderRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.md};

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaces.md};
`;

export const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserName = styled.p`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.gray900};
  margin: 0;
`;

export const ContactInfo = styled.div``;

export const Email = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray900};
  margin: 0;
`;

export const Phone = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.gray600};
  margin: ${({ theme }) => theme.spaces.xs} 0 0 0;
`;

export const Badge = styled.span<{
  variant?:
    | 'default'
    | 'success'
    | 'danger'
    | 'warning'
    | 'secondary'
    | 'outline';
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
          background-color: #10b98115;
          color: #10b981;
        `;
      case 'danger':
        return `
          background-color: ${theme.colors.danger}15;
          color: ${theme.colors.danger};
        `;
      case 'warning':
        return `
          background-color: ${theme.colors.warning}15;
          color: ${theme.colors.warning};
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

export const Button = styled.button<{
  variant?: 'primary' | 'ghost';
  size?: 'default' | 'icon';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ variant, theme }) => {
    if (variant === 'ghost') {
      return `
        background-color: transparent;
        color: ${theme.colors.gray700};
        padding: ${theme.spaces.sm};
        
        &:hover {
          background-color: ${theme.colors.gray100};
        }
      `;
    }
    return `
      background-color: ${theme.colors.primary};
      color: ${theme.colors.white};
      padding: ${theme.spaces.sm} ${theme.spaces.lg};
      
      &:hover {
        background-color: ${theme.colors.primary}dd;
        transform: translateY(-1px);
        box-shadow: ${theme.shadows.md};
      }
      
      &:active {
        transform: translateY(0);
      }
    `;
  }}

  ${({ size }) =>
    size === 'icon' &&
    `
    width: 40px;
    height: 40px;
    padding: 0;
  `}
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const ActionButton = styled(Button)`
  margin-right: ${({ theme }) => theme.spaces.sm};
`;

export const DropdownTrigger = styled(Button)``;

export const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spaces['2xl']};
  color: ${({ theme }) => theme.colors.gray600};
`;
