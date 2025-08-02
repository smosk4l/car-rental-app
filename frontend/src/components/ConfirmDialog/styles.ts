import styled from 'styled-components';

export const IconWrapper = styled.span<{
  variant: 'danger' | 'warning' | 'info';
}>`
  display: inline-flex;
  margin-right: ${({ theme }) => theme.spaces.sm};
  color: ${({ theme, variant }) => {
    switch (variant) {
      case 'danger':
        return theme.colors.danger;
      case 'warning':
        return theme.colors.warning || theme.colors.primary;
      case 'info':
      default:
        return theme.colors.primary;
    }
  }};
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spaces.sm};
  justify-content: flex-end;
  width: 100%;
`;
