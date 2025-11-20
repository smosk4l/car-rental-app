import styled from "styled-components";
import { Input } from "@/components/Input/Input";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.xl};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spaces.md};
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.xs};
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.gray900};
  margin: 0;
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.gray600};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: 0;
`;

export const SearchContainer = styled.div`
  position: relative;
  max-width: 24rem;
  width: 100%;
`;

export const SearchIconWrapper = styled.div`
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

export const TableContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  overflow: hidden;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spaces.md};

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const FormField = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.xs};
  ${({ $fullWidth }) => $fullWidth && "grid-column: 1 / -1;"}
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: ${({ theme }) => theme.spaces.xs} 0 0 0;
`;

export const LocationName = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaces.sm};
`;

export const IconWrapper = styled.div`
  width: 16px;
  height: 16px;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ActionButton = styled.button<{
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
    color: ${({ theme }) => theme.colors.primary};
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
  text-align: center;
  padding: ${({ theme }) => theme.spaces['2xl']};
  color: ${({ theme }) => theme.colors.gray600};
`;
