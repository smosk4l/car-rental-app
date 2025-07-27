import { Box } from '@chakra-ui/react';

interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
}

export default function Card({ children, hover = true }: CardProps) {
  return (
    <Box
      bg="white"
      borderRadius="xl"
      shadow="lg"
      border="1px solid"
      borderColor="gray.200"
      p={6}
      {...(hover && {
        _hover: { transform: 'translateY(-4px)', shadow: 'xl' },
        transition: 'all 0.3s ease',
      })}
    >
      {children}
    </Box>
  );
}
