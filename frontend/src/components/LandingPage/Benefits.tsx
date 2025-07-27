import { VStack, SimpleGrid, Box, Heading, Text } from '@chakra-ui/react';
import { CheckCircle } from 'lucide-react';
import SectionContainer from './SectionContainer';
import SectionHeader from './SectionHeader';

interface Benefit {
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    title: 'No hidden fees',
    description: 'Transparent pricing with no surprises',
  },
  { title: '24/7 support', description: 'Round-the-clock customer assistance' },
  {
    title: 'Easy cancellation',
    description: 'Cancel anytime with flexible policies',
  },
];

export default function Benefits() {
  return (
    <SectionContainer>
      <VStack gap={12}>
        <SectionHeader title="Benefits" />
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} w="full">
          {benefits.map((benefit, index) => (
            <VStack key={index} gap={4} textAlign="center">
              <Box
                bg="blue.500"
                color="white"
                borderRadius="full"
                w={16}
                h={16}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <CheckCircle size={24} />
              </Box>
              <Heading size="md" color="gray.800">
                {benefit.title}
              </Heading>
              <Text color="gray.600" textAlign="center">
                {benefit.description}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>
      </VStack>
    </SectionContainer>
  );
}
