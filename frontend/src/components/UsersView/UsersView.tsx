'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/Table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/Dropdown/Dropdown';
import {
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  Users as UsersIcon,
  UserPlus,
} from 'lucide-react';
import {
  Container,
  Header,
  HeaderContent,
  Title,
  Subtitle,
  StatsGrid,
  CardContent,
  CardHeader,
  CardTitle,
  StatCard,
  StatContent,
  StatInfo,
  StatLabel,
  StatValue,
  IconWrapper,
  SearchContainer,
  SearchIcon,
  SearchInput,
  TableContainer,
  TableHeaderRow,
  UserInfo,
  Avatar,
  AvatarImage,
  UserName,
  ContactInfo,
  Email,
  Phone,
  Badge,
  Button,
  EmptyState,
} from './styles';

// Mock user data
const mockUsers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    status: 'active',
    role: 'customer',
    joinDate: '2024-01-15',
    totalBookings: 12,
    totalSpent: '$2,840',
    avatar: '',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 234-5678',
    status: 'active',
    role: 'customer',
    joinDate: '2024-02-03',
    totalBookings: 8,
    totalSpent: '$1,920',
    avatar: '',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    phone: '+1 (555) 345-6789',
    status: 'suspended',
    role: 'customer',
    joinDate: '2023-11-22',
    totalBookings: 15,
    totalSpent: '$3,150',
    avatar: '',
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@email.com',
    phone: '+1 (555) 456-7890',
    status: 'active',
    role: 'admin',
    joinDate: '2023-08-10',
    totalBookings: 0,
    totalSpent: '$0',
    avatar: '',
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@email.com',
    phone: '+1 (555) 567-8901',
    status: 'inactive',
    role: 'customer',
    joinDate: '2024-03-07',
    totalBookings: 3,
    totalSpent: '$720',
    avatar: '',
  },
];

const UsersView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users] = useState(mockUsers);

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'suspended':
        return <Badge variant="danger">Suspended</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge variant="default">Admin</Badge>;
      case 'customer':
        return <Badge variant="outline">Customer</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const handleUserAction = (action: string, userId: string) => {
    console.log(`${action} user:`, userId);
    // TODO: Implement user actions
  };

  return (
    <Container>
      {/* Header */}
      <Header>
        <HeaderContent>
          <Title>Users Management</Title>
          <Subtitle>Manage and monitor all platform users</Subtitle>
        </HeaderContent>
        <Button>
          <UserPlus style={{ marginRight: '8px' }} />
          Add New User
        </Button>
      </Header>

      {/* Stats Cards */}
      <StatsGrid>
        <StatCard>
          <CardContent>
            <StatContent>
              <StatInfo>
                <StatLabel>Total Users</StatLabel>
                <StatValue>{users.length}</StatValue>
              </StatInfo>
              <IconWrapper>
                <UsersIcon />
              </IconWrapper>
            </StatContent>
          </CardContent>
        </StatCard>

        <StatCard>
          <CardContent>
            <StatContent>
              <StatInfo>
                <StatLabel>Active Users</StatLabel>
                <StatValue>
                  {users.filter(u => u.status === 'active').length}
                </StatValue>
              </StatInfo>
              <IconWrapper color="#10b981">
                <CheckCircle />
              </IconWrapper>
            </StatContent>
          </CardContent>
        </StatCard>

        <StatCard>
          <CardContent>
            <StatContent>
              <StatInfo>
                <StatLabel>Suspended</StatLabel>
                <StatValue>
                  {users.filter(u => u.status === 'suspended').length}
                </StatValue>
              </StatInfo>
              <IconWrapper color="#ef4444">
                <Ban />
              </IconWrapper>
            </StatContent>
          </CardContent>
        </StatCard>

        <StatCard>
          <CardContent>
            <StatContent>
              <StatInfo>
                <StatLabel>Admins</StatLabel>
                <StatValue>
                  {users.filter(u => u.role === 'admin').length}
                </StatValue>
              </StatInfo>
              <IconWrapper color="#3b82f6">
                <UsersIcon />
              </IconWrapper>
            </StatContent>
          </CardContent>
        </StatCard>
      </StatsGrid>

      {/* Users Table */}
      <TableContainer>
        <CardHeader>
          <TableHeaderRow>
            <CardTitle>All Users</CardTitle>
            <SearchContainer>
              <SearchIcon>
                <Search />
              </SearchIcon>
              <SearchInput
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
              />
            </SearchContainer>
          </TableHeaderRow>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 ? (
            <EmptyState>No users found matching your search.</EmptyState>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead style={{ textAlign: 'right' }}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <UserInfo>
                        <Avatar>
                          {user.avatar ? (
                            <AvatarImage src={user.avatar} alt={user.name} />
                          ) : (
                            user.name
                              .split(' ')
                              .map(n => n[0])
                              .join('')
                          )}
                        </Avatar>
                        <UserName>{user.name}</UserName>
                      </UserInfo>
                    </TableCell>
                    <TableCell>
                      <ContactInfo>
                        <Email>{user.email}</Email>
                        <Phone>{user.phone}</Phone>
                      </ContactInfo>
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell>{user.totalBookings}</TableCell>
                    <TableCell>{user.totalSpent}</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="right">
                          <DropdownMenuItem
                            onSelect={() => handleUserAction('edit', user.id)}
                          >
                            <Edit
                              style={{
                                marginRight: '8px',
                                width: '16px',
                                height: '16px',
                              }}
                            />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() =>
                              handleUserAction('suspend', user.id)
                            }
                          >
                            <Ban
                              style={{
                                marginRight: '8px',
                                width: '16px',
                                height: '16px',
                              }}
                            />
                            Suspend User
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => handleUserAction('delete', user.id)}
                            variant="danger"
                          >
                            <Trash2
                              style={{
                                marginRight: '8px',
                                width: '16px',
                                height: '16px',
                              }}
                            />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </TableContainer>
    </Container>
  );
};

export default UsersView;
