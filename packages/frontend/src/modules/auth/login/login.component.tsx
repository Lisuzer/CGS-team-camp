import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { AuthButtonContainer, Form, AuthInput, ForgetLink, Container } from '../auth.styled';
import { IFormProps, ILoginData } from '../types/user.types';
import { APP_KEYS } from '../../common/consts';

const LoginComponent: FC<IFormProps<ILoginData>> = (props) => {
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
        <AuthButtonContainer>
          <Button type="submit" disabled={isLoading} variant="contained">
            Submit
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={() => navigate(APP_KEYS.ROUTER_KEYS.REGISTER)}
          >
            Sign up
          </Button>
        </AuthButtonContainer>
        <ForgetLink type="button" onClick={() => navigate(APP_KEYS.ROUTER_KEYS.RESET_PASSWORD)}>
          Forgot password?
        </ForgetLink>
      </Form>
    </Container>
  );
};

export default LoginComponent;
