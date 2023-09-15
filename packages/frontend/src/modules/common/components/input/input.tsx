import React from 'react';
import {
  Container,
  ErrorComponent,
  InputField,
  Label,
  Placeholder,
  TextAreaField,
  Wrapper
} from './input.styled';
import { InputProps, OnInputChange, OnTextAreaChange } from '../../types/input.type';

const CustomInput = (props: InputProps) => {
  const { value, name, className, placeholder, type, label, error, onChange } = props;
  return (
    <Container className={className}>
      <Label htmlFor={name} label={label}>
        {label}
      </Label>
      <Wrapper>
        {type === 'textarea' ? (
          <TextAreaField
            id={name}
            name={name}
            value={value}
            onChange={onChange as OnTextAreaChange}
          />
        ) : (
          <InputField
            id={name}
            name={name}
            value={value}
            onChange={onChange as OnInputChange}
            type={type}
          />
        )}
        <Placeholder value={value} placeholder={placeholder} type={type}>
          {placeholder}
        </Placeholder>
      </Wrapper>
      <ErrorComponent error={error}>{error}</ErrorComponent>
    </Container>
  );
};

export default CustomInput;
