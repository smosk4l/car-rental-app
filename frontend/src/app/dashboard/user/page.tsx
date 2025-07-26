'use client';

import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { DashboardLayout } from '@/components/DashboardLayout';

export default function UserDashboard() {
  return (
    <DashboardLayout>
      <VStack alignItems="flex-start" gap={6}>
        <Box>
          <Heading size="lg" color="brand.700" mb={2}>
            User Dashboard
          </Heading>
          <Text color="gray.600">
            Welcome to your dashboard. Here you can browse cars and manage your
            reservations.
          </Text>
        </Box>

        <Box p={6} bg="white" borderRadius="md" shadow="sm" w="full">
          <Text fontSize="lg" fontWeight="semibold" mb={4}>
            Your Activity
          </Text>
          <Text color="gray.600">
            User features will be implemented here. This is a placeholder for
            the user dashboard content.
          </Text>
        </Box>
      </VStack>
    </DashboardLayout>
  );
}
