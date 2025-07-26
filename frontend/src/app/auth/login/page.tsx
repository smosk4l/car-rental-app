'use client';

import styled from 'styled-components';
import LoginForm from '@/components/LoginForm';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary}20,
    ${({ theme }) => theme.colors.secondary}20
  );
  padding: ${({ theme }) => theme.spaces.md};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spaces.lg};
`;

const Logo = styled.div`
  text-align: center;
`;

const LogoTitle = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin: 0;
`;

const LogoSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.gray600};
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin: ${({ theme }) => theme.spaces.xs} 0 0 0;
`;

const LoginPage: React.FC = () => {
  return (
    <PageContainer>
      <ContentWrapper>
        <Logo>
          <LogoTitle>🚗 Car Rental</LogoTitle>
          <LogoSubtitle>Your journey starts here</LogoSubtitle>
        </Logo>
        <LoginForm />
      </ContentWrapper>
    </PageContainer>
  );
};

export default LoginPage;
