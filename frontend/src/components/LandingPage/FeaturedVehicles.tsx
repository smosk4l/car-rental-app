import {
  VStack,
  SimpleGrid,
  Image,
  Heading,
  Text,
  Button,
} from '@chakra-ui/react';
import SectionContainer from './SectionContainer';
import SectionHeader from './SectionHeader';
import Card from './Card';

interface Vehicle {
  id: number;
  name: string;
  price: string;
  image: string;
}

const vehicles: Vehicle[] = [
  {
    id: 1,
    name: 'Luxury Sedan',
    price: '$99 per day',
    image:
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0Y3RkFGQyIvPg0KPHBhdGggZD0iTTUwIDEyMEwyNTAgMTIwTDIzMCAxMDBMMjAwIDkwTDE3MCA4MEwxNDAgNzBMMTEwIDYwTDgwIDUwTDUwIDYwVjEyMFoiIGZpbGw9IiNFNUU3RUIiLz4NCjxlbGxpcHNlIGN4PSIxMDAiIGN5PSIxMjAiIHJ4PSIyMCIgcnk9IjIwIiBmaWxsPSIjMzc0MTUxIi8+DQo8ZWxsaXBzZSBjeD0iMjAwIiBjeT0iMTIwIiByeD0iMjAiIHJ5PSIyMCIgZmlsbD0iIzM3NDE1MSIvPg0KPC9zdmc+',
  },
  {
    id: 2,
    name: 'Sport Convertible',
    price: '$179 per day',
    image:
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0ZFRjJGMiIvPg0KPHBhdGggZD0iTTUwIDEyMEwyNTAgMTIwTDIzMCAxMDBMMjAwIDkwTDE3MCA4MEwxNDAgNzBMMTEwIDYwTDgwIDUwTDUwIDYwVjEyMFoiIGZpbGw9IiNEQzI2MjYiLz4NCjxlbGxpcHNlIGN4PSIxMDAiIGN5PSIxMjAiIHJ4PSIyMCIgcnk9IjIwIiBmaWxsPSIjMzc0MTUxIi8+DQo8ZWxsaXBzZSBjeD0iMjAwIiBjeT0iMTIwIiByeD0iMjAiIHJ5PSIyMCIgZmlsbD0iIzM3NDE1MSIvPg0KPC9zdmc+',
  },
  {
    id: 3,
    name: 'Elegant SUV',
    price: '$89 per day',
    image:
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0Y0RjRGNSIvPg0KPHBhdGggZD0iTTQwIDEzMEwyNjAgMTMwTDI0MCA5MEwyMTAgODBMMTgwIDcwTDE1MCA2MEwxMjAgNTBMOTAgNDBMNjAgNDBMNDAgNjBWMTMwWiIgZmlsbD0iIzZCNzI4OSIvPg0KPGVsbGlwc2UgY3g9IjEwMCIgY3k9IjEzMCIgcng9IjI1IiByeT0iMjUiIGZpbGw9IiMzNzQxNTEiLz4NCjxlbGxpcHNlIGN4PSIyMDAiIGN5PSIxMzAiIHJ4PSIyNSIgcnk9IjI1IiBmaWxsPSIjMzc0MTUxIi8+DQo8L3N2Zz4=',
  },
];

export default function FeaturedVehicles() {
  return (
    <SectionContainer bg="gray.50">
      <VStack gap={12}>
        <SectionHeader title="Featured Vehicles" />
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} w="full">
          {vehicles.map(vehicle => (
            <Card key={vehicle.id}>
              <VStack gap={4}>
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  w="full"
                  h="200px"
                  objectFit="cover"
                  borderRadius="lg"
                />
                <VStack alignItems="flex-start" gap={3} w="full">
                  <Heading size="md" color="gray.800">
                    {vehicle.name}
                  </Heading>
                  <Text color="gray.600" fontWeight="semibold">
                    {vehicle.price}
                  </Text>
                  <Button
                    bg="orange.500"
                    color="white"
                    size="sm"
                    w="full"
                    borderRadius="lg"
                    _hover={{ bg: 'orange.600' }}
                  >
                    Reserve
                  </Button>
                </VStack>
              </VStack>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>
    </SectionContainer>
  );
}
