'use client';

import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { DashboardLayout } from '@/components/DashboardLayout';

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <VStack alignItems="flex-start" gap={6}>
        <Box>
          <Heading size="lg" color="brand.700" mb={2}>
            Admin Dashboard
          </Heading>
          <Text color="gray.600">
            Welcome to the admin dashboard. Here you can manage cars, users, and
            view reports.
          </Text>
        </Box>

        <Box p={6} bg="white" borderRadius="md" shadow="sm" w="full">
          <Text fontSize="lg" fontWeight="semibold" mb={4}>
            Quick Actions
          </Text>
          <Text color="gray.600">
            Admin features will be implemented here. This is a placeholder for
            the admin dashboard content.
          </Text>
        </Box>
      </VStack>
    </DashboardLayout>
  );
}
