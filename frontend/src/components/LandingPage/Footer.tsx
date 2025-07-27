import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  HStack,
  Heading,
  Text,
} from '@chakra-ui/react';
import { Phone, Mail, Globe, Users, MapPin } from 'lucide-react';

export default function Footer() {
  const contactInfo = [
    { icon: Phone, text: 'Phone: (123) 456-7890' },
    { icon: Mail, text: 'Email: info@carrentalservice.com' },
  ];

  const socialIcons = [Globe, Users, MapPin];
  const navLinks = ['Home', 'About Us', 'Services', 'Contact'];

  return (
    <Box bg="gray.900" color="white" py={12}>
      <Container maxW="8xl">
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
          <VStack alignItems="flex-start" gap={4}>
            <Heading size="md">Contact Info</Heading>
            <VStack alignItems="flex-start" gap={2}>
              {contactInfo.map(({ icon: Icon, text }, index) => (
                <HStack key={index}>
                  <Icon size={16} />
                  <Text fontSize="sm">{text}</Text>
                </HStack>
              ))}
            </VStack>
          </VStack>

          <VStack alignItems="flex-start" gap={4}>
            <Heading size="md">Social Media</Heading>
            <HStack gap={4}>
              {socialIcons.map((Icon, index) => (
                <Box key={index} cursor="pointer" _hover={{ opacity: 0.7 }}>
                  <Icon size={20} />
                </Box>
              ))}
            </HStack>
          </VStack>

          <VStack alignItems="flex-start" gap={4}>
            <Heading size="md">Navigation</Heading>
            <VStack alignItems="flex-start" gap={2}>
              {navLinks.map((link, index) => (
                <Text
                  key={index}
                  fontSize="sm"
                  cursor="pointer"
                  _hover={{ opacity: 0.7 }}
                >
                  {link}
                </Text>
              ))}
            </VStack>
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
