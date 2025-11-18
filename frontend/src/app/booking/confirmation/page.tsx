'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useReservation } from '@/hooks/useReservations';
import { Button } from '@/components/Button/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/UI/Card';
import { Badge } from '@/components/UI/Badge';
import { Separator } from '@/components/UI/Separator';
import { CheckCircle, Calendar, MapPin, Clock, Car, CreditCard, AlertCircle, Loader2, ArrowLeft, Home } from 'lucide-react';
import { format } from 'date-fns';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.light};
`;

const Header = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
  background-color: ${({ theme }) => theme.colors.white};
`;

const HeaderContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.a`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.dark};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const MainContainer = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const SuccessHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const SuccessIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;

  svg {
    width: 4rem;
    height: 4rem;
    color: #10b981;
    background: ${({ theme }) => theme.colors.white};
    border-radius: 50%;
    padding: 0.75rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const SuccessTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 0.5rem;
`;

const SuccessSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.gray600};
`;

const InfoSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.25rem;
`;

const InfoValue = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const VehicleSection = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const VehicleImage = styled.img`
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 0.5rem;

  @media (max-width: 640px) {
    width: 100%;
    height: 200px;
  }
`;

const VehicleInfo = styled.div`
  flex: 1;
`;

const VehicleName = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const PriceSection = styled.div`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const PriceLabel = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const PriceValue = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
`;

const TotalRow = styled(PriceRow)`
  padding-top: 0.75rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: 0.75rem;
`;

const TotalLabel = styled.span`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const TotalValue = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const ActionsSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const ErrorContainer = styled.div`
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.light};
`;

const ErrorCard = styled.div`
  max-width: 28rem;
  width: 100%;
`;

function ConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reservationId = searchParams?.get('reservationId');

  const { data: reservation, isLoading, error } = useReservation(reservationId || '');

  if (isLoading) {
    return (
      <PageContainer>
        <Header>
          <HeaderContainer>
            <Logo as={Link} href="/">
              RentWheels
            </Logo>
          </HeaderContainer>
        </Header>
        <ErrorContainer>
          <Card>
            <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '3rem' }}>
              <Loader2 style={{ animation: 'spin 1s linear infinite', color: '#667eea', width: '3rem', height: '3rem' }} />
              <CardDescription>Loading reservation details...</CardDescription>
            </CardContent>
          </Card>
        </ErrorContainer>
      </PageContainer>
    );
  }

  if (error || !reservation) {
    return (
      <PageContainer>
        <Header>
          <HeaderContainer>
            <Logo as={Link} href="/">
              RentWheels
            </Logo>
          </HeaderContainer>
        </Header>
        <ErrorContainer>
          <ErrorCard>
            <Card>
              <CardHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertCircle style={{ color: '#dc3545' }} />
                  <CardTitle>Reservation Not Found</CardTitle>
                </div>
                <CardDescription>
                  {error instanceof Error ? error.message : 'The reservation could not be found.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => router.push('/fleet')} fullWidth>
                  <ArrowLeft style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
                  Back to Fleet
                </Button>
              </CardContent>
            </Card>
          </ErrorCard>
        </ErrorContainer>
      </PageContainer>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'default';
      case 'CONFIRMED':
        return 'success';
      case 'COMPLETED':
        return 'secondary';
      case 'CANCELLED':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const calculateDays = () => {
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(1, days);
  };

  const days = calculateDays();
  const pricePerDay = reservation.car?.pricePerDay || 0;

  return (
    <PageContainer>
      <Header>
        <HeaderContainer>
          <Logo as={Link} href="/">
            RentWheels
          </Logo>
          <Button variant="secondary" onClick={() => router.push('/fleet')}>
            <Home style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
            Back to Fleet
          </Button>
        </HeaderContainer>
      </Header>

      <MainContainer>
        <SuccessHeader>
          <SuccessIcon>
            <CheckCircle />
          </SuccessIcon>
          <SuccessTitle>Booking Confirmed!</SuccessTitle>
          <SuccessSubtitle>Your reservation has been successfully created</SuccessSubtitle>
        </SuccessHeader>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <CardTitle>Reservation Details</CardTitle>
                <CardDescription>Confirmation ID: {reservation.id}</CardDescription>
              </div>
              <Badge variant={getStatusColor(reservation.status)}>{reservation.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {/* Vehicle Information */}
            <InfoSection>
              <SectionTitle>
                <Car />
                Vehicle Information
              </SectionTitle>
              {reservation.car && (
                <VehicleSection>
                  {reservation.car.imageUrl && (
                    <VehicleImage
                      src={reservation.car.imageUrl}
                      alt={`${reservation.car.make} ${reservation.car.model}`}
                    />
                  )}
                  <VehicleInfo>
                    <VehicleName>
                      {reservation.car.year} {reservation.car.make} {reservation.car.model}
                    </VehicleName>
                    <Badge variant="secondary">{reservation.car.category}</Badge>
                    {reservation.car.transmission && (
                      <InfoItem style={{ marginTop: '0.5rem' }}>
                        <InfoLabel>Transmission</InfoLabel>
                        <InfoValue>{reservation.car.transmission}</InfoValue>
                      </InfoItem>
                    )}
                  </VehicleInfo>
                </VehicleSection>
              )}
            </InfoSection>

            <Separator />

            {/* Pickup & Return Details */}
            <InfoSection>
              <SectionTitle>
                <Calendar />
                Pickup & Return Details
              </SectionTitle>
              <InfoGrid>
                <InfoItem>
                  <InfoLabel>Pickup Date & Time</InfoLabel>
                  <InfoValue>
                    {format(new Date(reservation.startDate), 'PPP')} at {reservation.pickupTime}
                  </InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Return Date & Time</InfoLabel>
                  <InfoValue>
                    {format(new Date(reservation.endDate), 'PPP')} at {reservation.returnTime}
                  </InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>
                    <MapPin style={{ width: '0.875rem', height: '0.875rem', display: 'inline', marginRight: '0.25rem' }} />
                    Pickup Location
                  </InfoLabel>
                  <InfoValue>{reservation.pickupLocation}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>
                    <MapPin style={{ width: '0.875rem', height: '0.875rem', display: 'inline', marginRight: '0.25rem' }} />
                    Return Location
                  </InfoLabel>
                  <InfoValue>{reservation.returnLocation}</InfoValue>
                </InfoItem>
              </InfoGrid>
            </InfoSection>

            <Separator />

            {/* Pricing */}
            <InfoSection>
              <SectionTitle>
                <CreditCard />
                Pricing Summary
              </SectionTitle>
              <PriceSection>
                <PriceRow>
                  <PriceLabel>Daily Rate</PriceLabel>
                  <PriceValue>${pricePerDay}/day</PriceValue>
                </PriceRow>
                <PriceRow>
                  <PriceLabel>Rental Duration</PriceLabel>
                  <PriceValue>{days} {days === 1 ? 'day' : 'days'}</PriceValue>
                </PriceRow>
                <TotalRow>
                  <TotalLabel>Total Amount</TotalLabel>
                  <TotalValue>${reservation.totalCost}</TotalValue>
                </TotalRow>
              </PriceSection>
            </InfoSection>

            {reservation.notes && (
              <>
                <Separator />
                <InfoSection>
                  <SectionTitle>Special Requests</SectionTitle>
                  <InfoValue>{reservation.notes}</InfoValue>
                </InfoSection>
              </>
            )}

            <ActionsSection>
              <Button onClick={() => router.push('/fleet')} fullWidth>
                Back to Fleet
              </Button>
              <Button variant="outline" onClick={() => router.push('/')} fullWidth>
                Go to Home
              </Button>
            </ActionsSection>
          </CardContent>
        </Card>
      </MainContainer>
    </PageContainer>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <PageContainer>
        <ErrorContainer>
          <Loader2 style={{ animation: 'spin 1s linear infinite', color: '#667eea', width: '3rem', height: '3rem' }} />
        </ErrorContainer>
      </PageContainer>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
