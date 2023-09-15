import React from 'react';
import RegisterContainer from './register.container';
import { Header } from '../auth.styled';

const RegisterPage = () => (
  <div>
    <Header>Registration</Header>
    <Header>After you press submit, you will need to confirm your email</Header>
    <RegisterContainer />
  </div>
);

export default RegisterPage;
