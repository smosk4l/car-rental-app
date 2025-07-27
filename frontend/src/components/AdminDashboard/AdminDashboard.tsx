'use client';

import { CardContent } from '@/components/UI/Card';
import { Button } from '@/components/Button/Button';
import {
  TrendingUp,
  Users,
  Car,
  DollarSign,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react';
import {
  Container,
  StatsGrid,
  StatsCard,
  StatsHeader,
  StatsTitle,
  StatsIcon,
  StatsValue,
  StatsChangeContainer,
  StatsChange,
  StatsDescription,
  MainGrid,
  SectionCard,
  SectionHeader,
  SectionTitle,
  TitleWithIcon,
  TitleIcon,
  BookingsList,
  BookingItem,
  BookingContent,
  BookingHeader,
  BookingId,
  BookingBadge,
  BookingDetail,
  BookingValue,
  BookingPrice,
  AlertsList,
  AlertItem,
  AlertIcon,
  AlertContent,
  AlertMessage,
  AlertTime,
  AlertButton,
  QuickActionsCard,
  QuickActionsGrid,
  ActionButton,
} from './style';
import { useRouter } from 'next/navigation';

const stats = [
  {
    title: 'Total Revenue',
    value: '$24,847',
    change: '+12.5%',
    changeType: 'positive' as const,
    icon: DollarSign,
    description: 'vs last month',
  },
  {
    title: 'Active Bookings',
    value: '47',
    change: '+8.2%',
    changeType: 'positive' as const,
    icon: Calendar,
    description: 'currently rented',
  },
  {
    title: 'Total Users',
    value: '1,429',
    change: '+15.1%',
    changeType: 'positive' as const,
    icon: Users,
    description: 'registered users',
  },
  {
    title: 'Fleet Utilization',
    value: '78%',
    change: '-2.1%',
    changeType: 'negative' as const,
    icon: Car,
    description: 'of total fleet',
  },
];

const recentBookings = [
  {
    id: 'BK012',
    customer: 'Sarah Johnson',
    car: 'BMW 5 Series',
    status: 'Active',
    duration: '3 days',
    value: '$267',
  },
  {
    id: 'BK013',
    customer: 'Michael Chen',
    car: 'Ferrari F8',
    status: 'Pending',
    duration: '1 day',
    value: '$299',
  },
  {
    id: 'BK014',
    customer: 'Emily Rodriguez',
    car: 'Range Rover',
    status: 'Completed',
    duration: '5 days',
    value: '$645',
  },
];

const alerts = [
  {
    type: 'warning' as const,
    message: 'BMW X5 (License: ABC123) requires maintenance',
    time: '2 hours ago',
  },
  {
    type: 'info' as const,
    message: 'New user registration: John Smith',
    time: '4 hours ago',
  },
  {
    type: 'success' as const,
    message: 'Payment received for booking BK011',
    time: '6 hours ago',
  },
];

const AdminDashboard = () => {
  const router = useRouter();

  const handleAddCarClick = () => {
    router.push('/admin/cars/add');
  };

  return (
    <Container>
      {/* Stats Cards */}
      <StatsGrid>
        {stats.map((stat, index) => (
          <StatsCard key={index}>
            <StatsHeader>
              <StatsTitle>{stat.title}</StatsTitle>
              <StatsIcon>
                <stat.icon style={{ width: '1rem', height: '1rem' }} />
              </StatsIcon>
            </StatsHeader>
            <CardContent>
              <StatsValue>{stat.value}</StatsValue>
              <StatsChangeContainer>
                <StatsChange $changeType={stat.changeType}>
                  {stat.change}
                </StatsChange>
                <StatsDescription>{stat.description}</StatsDescription>
              </StatsChangeContainer>
            </CardContent>
          </StatsCard>
        ))}
      </StatsGrid>

      <MainGrid>
        {/* Recent Bookings */}
        <SectionCard>
          <SectionHeader>
            <SectionTitle>
              <TitleWithIcon>
                <TitleIcon>
                  <Calendar style={{ width: '1.25rem', height: '1.25rem' }} />
                </TitleIcon>
                <span>Recent Bookings</span>
              </TitleWithIcon>
              <Button variant="secondary" size="sm">
                View All
              </Button>
            </SectionTitle>
          </SectionHeader>
          <CardContent>
            <BookingsList>
              {recentBookings.map(booking => (
                <BookingItem key={booking.id}>
                  <BookingContent>
                    <BookingHeader>
                      <BookingId>{booking.id}</BookingId>
                      <BookingBadge
                        variant={
                          booking.status === 'Active'
                            ? 'default'
                            : booking.status === 'Pending'
                              ? 'secondary'
                              : 'outline'
                        }
                      >
                        {booking.status}
                      </BookingBadge>
                    </BookingHeader>
                    <BookingDetail>{booking.customer}</BookingDetail>
                    <BookingDetail>
                      {booking.car} • {booking.duration}
                    </BookingDetail>
                  </BookingContent>
                  <BookingValue>
                    <BookingPrice>{booking.value}</BookingPrice>
                  </BookingValue>
                </BookingItem>
              ))}
            </BookingsList>
          </CardContent>
        </SectionCard>

        {/* Alerts & Notifications */}
        <SectionCard>
          <SectionHeader>
            <SectionTitle>
              <TitleWithIcon>
                <TitleIcon>
                  <AlertCircle
                    style={{ width: '1.25rem', height: '1.25rem' }}
                  />
                </TitleIcon>
                <span>Alerts & Notifications</span>
              </TitleWithIcon>
            </SectionTitle>
          </SectionHeader>
          <CardContent>
            <AlertsList>
              {alerts.map((alert, index) => (
                <AlertItem key={index}>
                  <AlertIcon $type={alert.type}>
                    {alert.type === 'warning' ? (
                      <AlertCircle style={{ width: '1rem', height: '1rem' }} />
                    ) : alert.type === 'success' ? (
                      <CheckCircle style={{ width: '1rem', height: '1rem' }} />
                    ) : (
                      <Clock style={{ width: '1rem', height: '1rem' }} />
                    )}
                  </AlertIcon>
                  <AlertContent>
                    <AlertMessage>{alert.message}</AlertMessage>
                    <AlertTime>{alert.time}</AlertTime>
                  </AlertContent>
                </AlertItem>
              ))}
              <AlertButton variant="secondary">
                View All Notifications
              </AlertButton>
            </AlertsList>
          </CardContent>
        </SectionCard>
      </MainGrid>

      {/* Quick Actions */}
      <QuickActionsCard onClick={handleAddCarClick}>
        <SectionHeader>
          <SectionTitle>Quick Actions</SectionTitle>
        </SectionHeader>
        <CardContent>
          <QuickActionsGrid>
            <ActionButton variant="primary">
              <Car style={{ width: '1.5rem', height: '1.5rem' }} />
              <span>Add New Car</span>
            </ActionButton>
            <ActionButton variant="secondary">
              <Users style={{ width: '1.5rem', height: '1.5rem' }} />
              <span>Manage Users</span>
            </ActionButton>
            <ActionButton variant="secondary">
              <TrendingUp style={{ width: '1.5rem', height: '1.5rem' }} />
              <span>View Analytics</span>
            </ActionButton>
            <ActionButton variant="secondary">
              <DollarSign style={{ width: '1.5rem', height: '1.5rem' }} />
              <span>Generate Report</span>
            </ActionButton>
          </QuickActionsGrid>
        </CardContent>
      </QuickActionsCard>
    </Container>
  );
};

export default AdminDashboard;
