import styled from 'styled-components';

export const FormContainer = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spaces.xl};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.gray800};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spaces.lg};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.md};
`;

export const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.danger}10;
  color: ${({ theme }) => theme.colors.danger};
  padding: ${({ theme }) => theme.spaces.sm};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.danger}30;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-align: center;
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
