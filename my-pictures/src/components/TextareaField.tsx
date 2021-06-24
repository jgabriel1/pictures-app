import {
  FormControl,
  FormLabel,
  Textarea,
  TextareaProps,
  forwardRef,
  FormErrorMessage,
} from '@chakra-ui/react';
import React from 'react';

interface TextareaFieldProps extends TextareaProps {
  label: string;
  isInvalid?: boolean;
  isRequiredError?: boolean;
}

export const TextareaField = forwardRef<TextareaFieldProps, 'input'>(
  ({ label, isInvalid, isRequiredError, ...inputProps }, ref) => (
    <FormControl id={inputProps.id} isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>

      <Textarea ref={ref} {...inputProps} resize="none" />

      <FormErrorMessage>
        {isRequiredError && 'Campo Obrigatório'}
      </FormErrorMessage>
    </FormControl>
  )
);
