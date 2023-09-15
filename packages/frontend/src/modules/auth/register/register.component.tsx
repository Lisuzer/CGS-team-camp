import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { IFormProps, ISignUpClient } from '../types/user.types';
import { AuthButtonContainer, Form, Container, AuthInput } from '../auth.styled';

const RegisterComponent: FC<IFormProps<ISignUpClient>> = (props) => {
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
        <AuthInput
          value={formik.values.password}
          name="password"
          error={formik.errors.password}
          label="Password"
          type="password"
          placeholder="Enter password"
          onChange={formik.handleChange}
        />
        <AuthInput
          value={formik.values.samePassword}
          name="samePassword"
          error={formik.errors.samePassword}
          label="Repeat password"
          type="password"
          placeholder="Enter password again"
          onChange={formik.handleChange}
        />
        <AuthButtonContainer>
          <Button variant="contained" disabled={isLoading} type="submit">
            Submit
          </Button>
          <Button variant="contained" type="button" onClick={() => navigate(-1)}>
            Back
          </Button>
        </AuthButtonContainer>
      </Form>
    </Container>
  );
};

export default RegisterComponent;
