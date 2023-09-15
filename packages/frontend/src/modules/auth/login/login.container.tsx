import React from 'react';
import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { userSchema } from '../../common/utils/validation-schema';
import userService from '../../../service/user.service';
import { INITIAL_VALUES } from './login.consts';
import LoginComponent from './login.component';
import { ILoginData } from '../types/user.types';
import { useLogin } from '../../common/hooks/use-login';

const LoginContainer = () => {
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (loginData: ILoginData) => userService.login(loginData)
  });
  const login = useLogin();

  const formik = useFormik<ILoginData>({
    initialValues: INITIAL_VALUES,
    validationSchema: userSchema.login,
    onSubmit: async (loginData: ILoginData) => {
      try {
        const responce = await mutateAsync(loginData);
        if (responce.error) {
          toast.error(responce.error);
        } else {
          formik.resetForm();
          login(responce);
        }
      } catch (e) {
        if (e instanceof Error) toast.error(e.message);
        toast.error('Something went wrong');
      }
    },
    validateOnChange: true
  });

  return <LoginComponent formik={formik} isLoading={isLoading} />;
};

export default LoginContainer;
