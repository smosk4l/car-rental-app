'use client';

import { useState } from 'react';
import ConfirmDialog from '@/components/ConfirmDialog';
import { useUsers, useSuspendUser, useDeleteUser } from '@/hooks/useUsers';
import type { User } from '@/lib/api/users';
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
  Loader2,
  AlertCircle,
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
  UserName,
  Email,
  Phone,
  Badge,
  Button,
  EmptyState,
  LoadingContainer,
  ErrorContainer,
} from './styles';

const UsersView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userToSuspend, setUserToSuspend] = useState<User | null>(null);
  const [showSuspendConfirm, setShowSuspendConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Fetch users using React Query
  const { data, isLoading, error } = useUsers();
  const suspendUserMutation = useSuspendUser();
  const deleteUserMutation = useDeleteUser();

  const users = data?.users || [];

  const filteredUsers = users.filter(
    user =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return <Badge variant="default">Admin</Badge>;
      case 'USER':
        return <Badge variant="outline">User</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge variant="success">Active</Badge>;
      case 'SUSPENDED':
        return <Badge variant="danger">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleSuspendUser = (user: User) => {
    setUserToSuspend(user);
    setShowSuspendConfirm(true);
  };

  const handleConfirmSuspend = () => {
    if (userToSuspend) {
      suspendUserMutation.mutate(userToSuspend.id);
      setUserToSuspend(null);
      setShowSuspendConfirm(false);
    }
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      deleteUserMutation.mutate(userToDelete.id);
      setUserToDelete(null);
      setShowDeleteConfirm(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingContainer>
          <Loader2 className="animate-spin" size={48} />
          <p>Loading users...</p>
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorContainer>
          <AlertCircle size={48} />
          <h3>Error loading users</h3>
          <p>Please try again later</p>
        </ErrorContainer>
      </Container>
    );
  }

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
                  {users.length}
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
                <StatLabel>Regular Users</StatLabel>
                <StatValue>
                  {users.filter(u => u.role === 'USER').length}
                </StatValue>
              </StatInfo>
              <IconWrapper color="#6b7280">
                <UsersIcon />
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
                  {users.filter(u => u.role === 'ADMIN').length}
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
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead style={{ textAlign: 'right' }}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <UserInfo>
                        <Avatar>
                          {user.firstName[0]}{user.lastName[0]}
                        </Avatar>
                        <UserName>{user.firstName} {user.lastName}</UserName>
                      </UserInfo>
                    </TableCell>
                    <TableCell>
                      <Email>{user.email}</Email>
                    </TableCell>
                    <TableCell>
                      <Phone>{user.phone || 'N/A'}</Phone>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{formatDate(user.createdAt)}</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="right">
                          <DropdownMenuItem
                            onSelect={() => console.log('Edit user:', user.id)}
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
                            onSelect={() => handleSuspendUser(user)}
                          >
                            {user.status === 'SUSPENDED' ? (
                              <>
                                <CheckCircle
                                  style={{
                                    marginRight: '8px',
                                    width: '16px',
                                    height: '16px',
                                  }}
                                />
                                Reactivate User
                              </>
                            ) : (
                              <>
                                <Ban
                                  style={{
                                    marginRight: '8px',
                                    width: '16px',
                                    height: '16px',
                                  }}
                                />
                                Suspend User
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => handleDeleteUser(user)}
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

      <ConfirmDialog
        open={showSuspendConfirm}
        onOpenChange={setShowSuspendConfirm}
        title={userToSuspend?.status === 'SUSPENDED' ? 'Reactivate User' : 'Suspend User'}
        description={
          userToSuspend
            ? userToSuspend.status === 'SUSPENDED'
              ? `Are you sure you want to reactivate ${userToSuspend.firstName} ${userToSuspend.lastName}? They will be able to access their account again.`
              : `Are you sure you want to suspend ${userToSuspend.firstName} ${userToSuspend.lastName}? They will not be able to access their account until reactivated.`
            : ''
        }
        confirmText={userToSuspend?.status === 'SUSPENDED' ? 'Reactivate' : 'Suspend'}
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleConfirmSuspend}
      />

      <ConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title="Delete User"
        description={
          userToDelete
            ? `Are you sure you want to delete ${userToDelete.firstName} ${userToDelete.lastName}? This action cannot be undone and will permanently remove all user data.`
            : ''
        }
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleConfirmDelete}
      />
    </Container>
  );
};

export default UsersView;
