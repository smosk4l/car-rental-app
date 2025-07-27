import { Box, Container, VStack, SimpleGrid } from '@chakra-ui/react';
import Card from './Card';
import SectionHeader from './SectionHeader';
import FormField from './FormField';

export default function SearchSection() {
  return (
    <Box bg="white" py={12}>
      <Container maxW="6xl">
        <Card hover={false}>
          <Box mt={-20} position="relative" zIndex={10}>
            <VStack gap={6}>
              <SectionHeader title="Search for Your Car" />
              <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} w="full">
                <FormField
                  label="Pickup Location"
                  placeholder="Pickup Location"
                />
                <FormField
                  label="Drop-off Location"
                  placeholder="Drop-off Location"
                />
                <FormField
                  label="Car Type"
                  placeholder="Car Type"
                  type="select"
                />
              </SimpleGrid>
            </VStack>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
