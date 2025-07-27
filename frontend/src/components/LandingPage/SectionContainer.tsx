import { Box, Container } from '@chakra-ui/react';

interface SectionContainerProps {
  bg?: string;
  children: React.ReactNode;
}

export default function SectionContainer({
  bg = 'white',
  children,
}: SectionContainerProps) {
  return (
    <Box bg={bg} py={16}>
      <Container maxW="8xl">{children}</Container>
    </Box>
  );
}
