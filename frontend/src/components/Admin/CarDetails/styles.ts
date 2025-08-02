import styled from 'styled-components';
import { DialogContent, DialogTitle } from '@/components/Dialog/Dialog';

export const StyledDialogContent = styled(DialogContent)`
  max-width: 42rem;
  max-height: 90vh;
  overflow-y: auto;
`;

export const StyledDialogTitle = styled(DialogTitle)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaces.sm};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.xl};
`;

export const ImageContainer = styled.div`
  aspect-ratio: 16 / 9;
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.gray100};
`;

export const CarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaces.md};
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spaces.md};
`;

export const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.md};
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spaces.sm};
`;

export const IconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.gray500};
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  margin-top: 2px;
`;

export const InfoContent = styled.div`
  flex: 1;
`;

export const InfoLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.gray900};
  margin: 0 0 ${({ theme }) => theme.spaces.xs} 0;
`;

export const InfoValue = styled.p<{ variant?: 'default' | 'mono' | 'semibold' }>`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray600};
  margin: 0;
  
  ${({ variant }) => {
    switch (variant) {
      case 'mono':
        return 'font-family: monospace;';
      case 'semibold':
        return 'font-weight: 600;';
      default:
        return '';
    }
  }}
`;

export const DescriptionSection = styled.div``;

export const DescriptionTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.gray900};
  margin: 0 0 ${({ theme }) => theme.spaces.sm} 0;
`;

export const DescriptionText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray600};
  margin: 0;
  line-height: 1.5;
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spaces.sm};
`;

export const Badge = styled.span<{ 
  variant?: 'default' | 'success' | 'danger' | 'secondary' | 'outline' 
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