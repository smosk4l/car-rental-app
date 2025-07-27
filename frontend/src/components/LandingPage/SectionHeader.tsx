import { Heading } from '@chakra-ui/react';

interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <Heading size="xl" color="gray.800" textAlign="center" mb={12}>
      {title}
    </Heading>
  );
}
