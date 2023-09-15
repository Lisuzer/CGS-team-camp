import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { AuthButtonContainer, Container, Form, AuthInput } from '../auth.styled';
import { IFormProps } from '../types/user.types';

const ForgotPasswordComponent: FC<IFormProps<{ email: string }>> = (props) => {
  const { formik, isLoading } = props;
  const navigate = useNavigate();

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <AuthInput
          value={formik.values.email}
          name="email"
          error={formik.errors.email}
          label="Email"
          type="email"
          placeholder="Enter email"
          onChange={formik.handleChange}
        />
        <AuthButtonContainer>
          <Button type="submit" variant="contained" endIcon={<SendIcon />} disabled={isLoading}>
            Send
          </Button>
          <Button variant="contained" type="button" onClick={() => navigate(-1)}>
            Back
          </Button>
        </AuthButtonContainer>
      </Form>
    </Container>
  );
};

export default ForgotPasswordComponent;
