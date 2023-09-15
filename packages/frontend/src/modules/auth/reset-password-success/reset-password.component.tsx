import React, { FC } from 'react';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Container, Form, AuthInput } from '../auth.styled';
import { IFormProps, IResetPasswordClient } from '../types/user.types';

const ResetPasswordComponent: FC<IFormProps<IResetPasswordClient>> = (props) => {
  const { formik, isLoading } = props;

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <AuthInput
          value={formik.values.newPassword}
          name="newPassword"
          error={formik.errors.newPassword}
          label="Password"
          type="password"
          placeholder="Enter password"
          onChange={formik.handleChange}
        />
        <AuthInput
          value={formik.values.samePassword}
          name="samePassword"
          error={formik.errors.samePassword}
          label="Password confirm"
          type="password"
          placeholder="Repeat password"
          onChange={formik.handleChange}
        />
        <Button type="submit" variant="contained" endIcon={<SendIcon />} disabled={isLoading}>
          Send
        </Button>
      </Form>
    </Container>
  );
};

export default ResetPasswordComponent;
