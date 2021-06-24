import {
  FormControl,
  FormLabel,
  Input,
  InputProps,
  forwardRef,
  FormErrorMessage,
} from '@chakra-ui/react';
import React from 'react';

interface InputFieldProps extends InputProps {
  label: string;
  isInvalid?: boolean;
  isRequiredError?: boolean;
}

export const InputField = forwardRef<InputFieldProps, 'input'>(
  ({ label, isInvalid, isRequiredError, ...inputProps }, ref) => (
    <FormControl id={inputProps.id} isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>

      <Input ref={ref} {...inputProps} />

      <FormErrorMessage>
        {isRequiredError && 'Campo Obrigatório'}
      </FormErrorMessage>
    </FormControl>
  )
);
