import styled, { css } from 'styled-components';

interface StyledSeparatorProps {
  orientation?: 'horizontal' | 'vertical';
}

export const StyledSeparator = styled.div<StyledSeparatorProps>`
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.gray200};
  
  ${({ orientation = 'horizontal' }) =>
    orientation === 'horizontal'
      ? css`
          height: 1px;
          width: 100%;
        `
      : css`
          height: 100%;
          width: 1px;
        `}
`;