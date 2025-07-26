'use client';

import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Button,
  Spacer,
} from '@chakra-ui/react';
import { ReactNode, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Menu,
  User,
  Home,
  Car,
  Users,
  BarChart,
  Calendar,
  UserCheck,
} from 'lucide-react';

interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface DashboardLayoutProps {
  children: ReactNode;
}

interface SidebarProps {
  isAdmin?: boolean;
  currentPath: string;
  onNavigate: (path: string) => void;
}

function SidebarContent({ isAdmin, currentPath, onNavigate }: SidebarProps) {
  const navItems = isAdmin
    ? [
        { icon: Home, label: 'Dashboard', path: '/dashboard/admin' },
        { icon: Car, label: 'Manage Cars', path: '/dashboard/admin/cars' },
        { icon: Users, label: 'Manage Users', path: '/dashboard/admin/users' },
        { icon: BarChart, label: 'Reports', path: '/dashboard/admin/reports' },
      ]
    : [
        { icon: Home, label: 'Dashboard', path: '/dashboard/user' },
        { icon: Car, label: 'Browse Cars', path: '/dashboard/user/cars' },
        {
          icon: Calendar,
          label: 'My Reservations',
          path: '/dashboard/user/reservations',
        },
        { icon: UserCheck, label: 'Profile', path: '/dashboard/user/profile' },
      ];

  return (
    <VStack alignItems="stretch" gap={2} p={4}>
      <Text fontSize="xl" fontWeight="bold" color="white" mb={4}>
        {isAdmin ? 'Admin Panel' : 'Dashboard'}
      </Text>

      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = currentPath === item.path;

        return (
          <Button
            key={item.path}
            variant={isActive ? 'solid' : 'ghost'}
            colorScheme={isActive ? 'blue' : undefined}
            color={isActive ? 'white' : 'white'}
            justifyContent="flex-start"
            onClick={() => onNavigate(item.path)}
            _hover={{
              bg: isActive ? 'blue.600' : 'whiteAlpha.200',
            }}
          >
            <HStack gap={2}>
              <Icon size={18} />
              <Text>{item.label}</Text>
            </HStack>
          </Button>
        );
      })}
    </VStack>
  );
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const isAdmin = (session?.user as SessionUser)?.role === 'ADMIN';

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsSidebarOpen(false); // Close mobile sidebar after navigation
  };

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Header */}
      <Flex
        as="header"
        bg="white"
        px={4}
        py={3}
        shadow="sm"
        alignItems="center"
        position="sticky"
        top={0}
        zIndex={1000}
      >
        <Button
          variant="ghost"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          display={{ base: 'flex', md: 'none' }}
          aria-label="Open menu"
          size="sm"
        >
          <Menu size={20} />
        </Button>

        <Text
          fontSize="xl"
          fontWeight="bold"
          color="brand.700"
          ml={{ base: 4, md: 0 }}
        >
          Car Rental App
        </Text>

        <Spacer />

        <HStack gap={4}>
          <Text
            fontSize="sm"
            color="gray.600"
            display={{ base: 'none', md: 'block' }}
          >
            Welcome, {(session?.user as SessionUser)?.name || 'User'}
          </Text>
          <Button variant="ghost" onClick={() => signOut()} size="sm">
            <User size={16} />
            <Text ml={2} display={{ base: 'none', sm: 'block' }}>
              Sign Out
            </Text>
          </Button>
        </HStack>
      </Flex>

      <Flex>
        {/* Desktop Sidebar */}
        <Box
          as="aside"
          w="250px"
          bg="brand.700"
          minH="calc(100vh - 60px)"
          display={{ base: 'none', md: 'block' }}
        >
          <SidebarContent
            isAdmin={isAdmin}
            currentPath={pathname}
            onNavigate={handleNavigate}
          />
        </Box>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <>
            <Box
              position="fixed"
              top="60px"
              left={0}
              w="100vw"
              h="calc(100vh - 60px)"
              bg="rgba(0, 0, 0, 0.5)"
              zIndex={999}
              onClick={() => setIsSidebarOpen(false)}
              display={{ base: 'block', md: 'none' }}
            />
            <Box
              position="fixed"
              top="60px"
              left={0}
              w="250px"
              h="calc(100vh - 60px)"
              bg="brand.700"
              zIndex={1000}
              display={{ base: 'block', md: 'none' }}
            >
              <SidebarContent
                isAdmin={isAdmin}
                currentPath={pathname}
                onNavigate={handleNavigate}
              />
            </Box>
          </>
        )}

        {/* Main Content */}
        <Box flex={1} p={6}>
          {children}
        </Box>
      </Flex>
    </Box>
  );
}
