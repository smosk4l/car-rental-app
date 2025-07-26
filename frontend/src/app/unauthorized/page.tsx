'use client';

import { Box, Heading, Text, VStack, Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Unauthorized() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleRedirect = () => {
    if (session?.user) {
      router.push('/dashboard/user');
    } else {
      router.push('/auth/login');
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <VStack
        gap={6}
        textAlign="center"
        p={8}
        bg="white"
        borderRadius="lg"
        shadow="md"
        maxW="md"
      >
        <Box>
          <Heading size="xl" color="red.500" mb={4}>
            Unauthorized Access
          </Heading>
          <Text color="gray.600" fontSize="lg" mb={2}>
            You don&apos;t have permission to access this page.
          </Text>
          <Text color="gray.500" fontSize="sm">
            This area is restricted to administrators only.
          </Text>
        </Box>

        <Button colorScheme="blue" onClick={handleRedirect} size="lg">
          {session?.user ? 'Go to Dashboard' : 'Sign In'}
        </Button>
      </VStack>
    </Box>
  );
}
