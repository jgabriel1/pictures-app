import { FormControl, FormLabel, Input, InputProps } from '@chakra-ui/react';

interface FormInputProps extends InputProps {
  label: string;
}

export const FormInput = ({ label, ...inputProps }: FormInputProps) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>

      <Input {...inputProps} />
    </FormControl>
  );
};
