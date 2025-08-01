import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { FormGroup, Label, Input, ErrorMessage } from './styles';

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  error?: FieldError;
  disabled?: boolean;
  autoComplete?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  register,
  error,
  disabled = false,
  autoComplete,
}) => {
  return (
    <FormGroup>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name)}
        disabled={disabled}
      />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </FormGroup>
  );
};