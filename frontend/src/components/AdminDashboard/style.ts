import styled from 'styled-components';
import { Card, CardHeader, CardTitle } from '@/components/UI/Card';
import { Badge } from '@/components/UI/Badge';
import { Button } from '@/components/Button/Button';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const StatsCard = styled(Card)`
  border: none;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    box-shadow:
      0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
`;

export const StatsHeader = styled(CardHeader)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  gap: 0;
`;

export const StatsTitle = styled(CardTitle)`
  font-size: 0.875rem;
  font-weight: 500;
  color: #718096;
`;

export const StatsIcon = styled.div`
  width: 1rem;
  height: 1rem;
  color: #718096;
`;

export const StatsValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
`;

export const StatsChangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
`;

export const StatsChange = styled.span<{
  $changeType: 'positive' | 'negative';
}>`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${props => (props.$changeType === 'positive' ? '#059669' : '#dc2626')};
`;

export const StatsDescription = styled.span`
  font-size: 0.75rem;
  color: #718096;
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const SectionCard = styled(Card)`
  border: none;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

export const SectionHeader = styled(CardHeader)``;

export const SectionTitle = styled(CardTitle)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TitleWithIcon = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const TitleIcon = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  color: #007bff;
`;

export const BookingsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const BookingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 0.5rem;
`;

export const BookingContent = styled.div`
  flex: 1;
`;

export const BookingHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
`;

export const BookingId = styled.h4`
  font-weight: 600;
  color: #1a202c;
  margin: 0;
`;

export const BookingBadge = styled(Badge)`
  font-size: 0.75rem;
`;

export const BookingDetail = styled.p`
  font-size: 0.875rem;
  color: #718096;
  margin: 0;
`;

export const BookingValue = styled.div`
  text-align: right;
`;

export const BookingPrice = styled.p`
  font-weight: 600;
  color: #1a202c;
  margin: 0;
`;

export const AlertsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AlertItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 0.5rem;
`;

export const AlertIcon = styled.div<{ $type: 'warning' | 'success' | 'info' }>`
  margin-top: 0.125rem;
  padding: 0.25rem;
  border-radius: 50%;
  background: ${props => {
    switch (props.$type) {
      case 'warning':
        return '#fef3c7';
      case 'success':
        return '#d1fae5';
      case 'info':
        return '#dbeafe';
      default:
        return '#dbeafe';
    }
  }};
  color: ${props => {
    switch (props.$type) {
      case 'warning':
        return '#d97706';
      case 'success':
        return '#059669';
      case 'info':
        return '#2563eb';
      default:
        return '#2563eb';
    }
  }};
`;

export const AlertContent = styled.div`
  flex: 1;
`;

export const AlertMessage = styled.p`
  font-size: 0.875rem;
  color: #1a202c;
  margin: 0;
`;

export const AlertTime = styled.p`
  font-size: 0.75rem;
  color: #718096;
  margin: 0.25rem 0 0 0;
`;

export const AlertButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
`;

export const QuickActionsCard = styled(Card)`
  border: none;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

export const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const ActionButton = styled(Button)`
  height: 5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
