import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
} from '@chakra-ui/react';

export default function HeroSection() {
  return (
    <Box
      minH="100vh"
      bgImage="url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPGRlZnM+DQo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMTBfMTAiIHgxPSI5NjAiIHkxPSIwIiB4Mj0iOTYwIiB5Mj0iMTA4MCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPg0KPHN0b3Agc3RvcC1jb2xvcj0iIzExMTgyNyIvPg0KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTExODI3Ii8+DQo8L2xpbmVhckdyYWRpZW50Pg0KPC9kZWZzPg0KPHJlY3Qgd2lkdGg9IjE5MjAiIGhlaWdodD0iMTA4MCIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyXzEwXzEwKSIvPg0KPC9zdmc+')"
      backgroundSize="cover"
      backgroundPosition="center"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box position="absolute" inset={0} bg="blackAlpha.600" zIndex={1} />
      <Box
        position="absolute"
        bottom={0}
        left="50%"
        transform="translateX(-50%)"
        zIndex={2}
        w="full"
        maxW="800px"
        h="400px"
        bgImage="url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cGF0aCBkPSJNMTAwIDMwMEw3MDAgMzAwTDY4MCAyMDBMNjIwIDE4MEw1ODAgMTYwTDUyMCAxNDBMNDYwIDEyMEw0MDAgMTAwTDM0MCA4MEwyODAgNjBMMjIwIDQwTDE2MCA0MEwxMjAgNjBMMTAwIDEwMFYzMDBaIiBmaWxsPSIjNkI3Mjg5IiBmaWxsLW9wYWNpdHk9IjAuOCIvPg0KPGVsbGlwc2UgY3g9IjIwMCIgY3k9IjMwMCIgcng9IjQwIiByeT0iNDAiIGZpbGw9IiMzNzQxNTEiLz4NCjxlbGxpcHNlIGN4PSI2MDAiIGN5PSIzMDAiIHJ4PSI0MCIgcnk9IjQwIiBmaWxsPSIjMzc0MTUxIi8+DQo8L3N2Zz4=')"
        backgroundSize="contain"
        backgroundRepeat="no-repeat"
        backgroundPosition="center bottom"
      />
      <Container maxW="8xl" position="relative" zIndex={3} textAlign="center">
        <VStack gap={6} color="white">
          <Button
            bg="orange.500"
            color="white"
            px={6}
            py={3}
            borderRadius="full"
            fontSize="sm"
            fontWeight="semibold"
            _hover={{ bg: 'orange.600' }}
          >
            Book Now
          </Button>
          <Heading size="3xl" fontWeight="bold" maxW="4xl">
            Find Your Perfect Ride
          </Heading>
          <Text fontSize="xl" opacity={0.9} maxW="2xl">
            Discover our premium fleet of vehicles for every occasion
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}
