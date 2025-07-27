import styled from 'styled-components';

export const StyledTextarea = styled.textarea`
  display: flex;
  min-height: 5rem; /* 80px */
  width: 100%;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => `${theme.spaces.sm} ${theme.spaces.md}`};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.dark};
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  resize: vertical;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray500};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;
