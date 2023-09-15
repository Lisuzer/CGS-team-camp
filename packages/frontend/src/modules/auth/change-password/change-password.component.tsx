import React, { FC } from 'react';
import { Button } from '@mui/material';
import { AuthInput, Container, Form } from '../auth.styled';
import { IChangePasswordClient, IFormProps } from '../types/user.types';

const ChangePasswordComponent: FC<IFormProps<IChangePasswordClient>> = (props) => {
  const { formik, isLoading } = props;

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <AuthInput
          value={formik.values.oldPassword}
          name="oldPassword"
          error={formik.errors.oldPassword}
          label="oldPassword"
          type="password"
          placeholder="Enter old password"
          onChange={formik.handleChange}
        />
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
        <Button variant="contained" disabled={isLoading} type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default ChangePasswordComponent;
