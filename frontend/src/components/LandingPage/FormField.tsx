import { Box, Text, Input } from '@chakra-ui/react';

interface FormFieldProps {
  label: string;
  placeholder: string;
  type?: 'input' | 'select';
}

export default function FormField({
  label,
  placeholder,
  type = 'input',
}: FormFieldProps) {
  return (
    <Box>
      <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
        {label}
      </Text>
      {type === 'input' ? (
        <Input
          placeholder={placeholder}
          bg="gray.50"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="lg"
          h={12}
          _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
        />
      ) : (
        <Box
          as="select"
          bg="gray.50"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="lg"
          h={12}
          w="full"
          px={3}
          _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
        >
          <option value="">{placeholder}</option>
          <option value="sedan">Sedan</option>
          <option value="suv">SUV</option>
          <option value="convertible">Convertible</option>
          <option value="luxury">Luxury</option>
        </Box>
      )}
    </Box>
  );
}
