import styled, { css } from 'styled-components';

// Shared layout mixins
const containerMixin = css`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
`;

const flexColumnMixin = css`
  display: flex;
  flex-direction: column;
`;

const flexRowMixin = css`
  display: flex;
  align-items: center;
`;

// Page Structure
export const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.light};
`;

export const Header = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const HeaderContainer = styled.div`
  ${containerMixin}
  ${flexRowMixin}
  justify-content: space-between;
`;

export const Logo = styled.a`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.dark};
  text-decoration: none;
  cursor: pointer;
`;

export const MainContainer = styled.div`
  ${containerMixin}
  padding: 2rem 1rem;
`;

export const HeaderSection = styled.div`
  margin-bottom: 1.5rem;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.gray600};
`;

// Grid Layout
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 2fr 1fr;
  }
`;

export const MainColumn = styled.div`
  ${flexColumnMixin}
  gap: 1.5rem;
`;

export const SidebarColumn = styled.div``;

// Vehicle Summary
export const VehicleSummaryContent = styled.div`
  ${flexColumnMixin}
  gap: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
  }
`;

export const VehicleImage = styled.img`
  width: 100%;
  height: 8rem;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radii.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 12rem;
  }
`;

export const VehicleInfo = styled.div`
  flex: 1;
`;

export const VehicleName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.dark};
`;

export const VehicleFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.75rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray600};
`;

export const FeatureItem = styled.div`
  ${flexRowMixin}
  gap: 0.25rem;

  svg {
    height: 1rem;
    width: 1rem;
  }
`;

// Form Sections
export const RentalDetailsContent = styled.div`
  ${flexColumnMixin}
  gap: 1.5rem;
`;

export const DetailsSection = styled.div`
  ${flexColumnMixin}
  gap: 1rem;
`;

export const SectionHeader = styled.div`
  ${flexRowMixin}
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.dark};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};

  svg {
    height: 1.25rem;
    width: 1.25rem;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const FormField = styled.div`
  ${flexColumnMixin}
  gap: 0.5rem;
`;

export const FullWidthField = styled(FormField)`
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: span 2;
  }
`;

export const TimeInputWrapper = styled.div`
  ${flexRowMixin}
  gap: 0.5rem;

  svg {
    height: 1rem;
    width: 1rem;
    color: ${({ theme }) => theme.colors.gray600};
  }
`;

// Summary Sidebar
export const StickyCard = styled.div`
  position: sticky;
  top: 1.5rem;
`;

export const SummaryContent = styled.div`
  ${flexColumnMixin}
  gap: 1rem;
`;

export const SummaryDetails = styled.div`
  ${flexColumnMixin}
  gap: 0.75rem;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const SummaryLabel = styled.span`
  color: ${({ theme }) => theme.colors.gray600};
`;

export const SummaryValue = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

export const TotalRow = styled(SummaryRow)`
  align-items: center;
`;

export const TotalLabel = styled(SummaryValue)`
  color: ${({ theme }) => theme.colors.dark};
`;

export const TotalAmount = styled.span`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

// Confirmation
export const ConfirmationBox = styled.div`
  ${flexColumnMixin}
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.radii.lg};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const ConfirmationItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;

  svg {
    height: 1rem;
    width: 1rem;
    color: ${({ theme }) => theme.colors.primary};
    margin-top: 0.125rem;
  }
`;

export const ConfirmationLabel = styled.p`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin: 0;
`;

export const ConfirmationText = styled.p`
  color: ${({ theme }) => theme.colors.gray600};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  margin: 0;
`;

export const DisclaimerText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-align: center;
  color: ${({ theme }) => theme.colors.gray600};
  margin: 0;
`;

// Error State
export const ErrorContainer = styled.div`
  ${containerMixin}
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.light};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ErrorCard = styled.div`
  max-width: 28rem;
  width: 100%;
`;
