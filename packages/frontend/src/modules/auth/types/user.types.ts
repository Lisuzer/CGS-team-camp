import { FormikProps } from 'formik';

export interface ISignUpServer {
  email: string;
  password: string;
}

export interface ISignUpClient {
  email: string;
  password: string;
  samePassword: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IForgetPassword {
  email: string;
}

export interface IUser {
  id: string;
  email: string;
}

export interface IResetPasswordServer {
  token: string;
  newPassword: string;
}

export interface IResetPasswordClient {
  newPassword: string;
  samePassword: string;
}

export interface IChangePasswordClient {
  oldPassword: string;
  newPassword: string;
  samePassword: string;
}

export interface IChangePasswordServer {
  oldPassword: string;
  newPassword: string;
}

export interface IFormProps<T> {
  formik: FormikProps<T>;
  isLoading: boolean;
}
