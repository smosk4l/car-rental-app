import { VStack, Box, Text } from '@chakra-ui/react';
import SectionContainer from './SectionContainer';
import SectionHeader from './SectionHeader';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: 'Can I cancel my reservation?',
    answer: 'Yes, you can cancel your reservation at any time.',
  },
  {
    question: 'Are there any hidden fees?',
    answer: 'No, we provide all costs upfront without any hidden charges.',
  },
];

export default function FAQ() {
  return (
    <SectionContainer>
      <VStack gap={12}>
        <SectionHeader title="FAQ" />
        <VStack gap={6} w="full" maxW="4xl">
          {faqs.map((faq, index) => (
            <Box
              key={index}
              w="full"
              p={6}
              bg="gray.50"
              borderRadius="lg"
              border="1px solid"
              borderColor="gray.200"
            >
              <VStack gap={3} alignItems="flex-start">
                <Text fontWeight="semibold" color="gray.800">
                  Q: {faq.question}
                </Text>
                <Text color="gray.600">A: {faq.answer}</Text>
              </VStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    </SectionContainer>
  );
}
