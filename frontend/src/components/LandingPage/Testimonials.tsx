import { VStack, SimpleGrid, Text } from '@chakra-ui/react';
import SectionContainer from './SectionContainer';
import SectionHeader from './SectionHeader';
import Card from './Card';

interface Testimonial {
  text: string;
  author: string;
}

const testimonials: Testimonial[] = [
  {
    text: 'Fantastic service, the car was in perfect condition and the process was seamless',
    author: 'Sarah T.',
  },
  {
    text: 'Great experience, loved the variety of cars and the customer support was excellent',
    author: 'Mark L.',
  },
];

export default function Testimonials() {
  return (
    <SectionContainer bg="gray.50">
      <VStack gap={12}>
        <SectionHeader title="Customer Testimonials" />
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} w="full">
          {testimonials.map((testimonial, index) => (
            <Card key={index} hover={false}>
              <VStack gap={4} alignItems="flex-start">
                <Text fontSize="lg" color="gray.700" fontStyle="italic">
                  &quot;{testimonial.text}&quot;
                </Text>
                <Text fontWeight="semibold" color="gray.800">
                  - {testimonial.author}
                </Text>
              </VStack>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>
    </SectionContainer>
  );
}
