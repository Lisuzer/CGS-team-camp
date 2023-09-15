import React from 'react';
import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { INITIAL_VALUES } from './register.consts';
import userService from '../../../service/user.service';
import { ISignUpServer, ISignUpClient } from '../types/user.types';
import { userSchema } from '../../common/utils/validation-schema';
import RegisterComponent from './register.component';

const RegisterContainer = () => {
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (signUpData: ISignUpServer) => userService.sendSignupEmail(signUpData)
  });
  const formik = useFormik<ISignUpClient>({
    initialValues: INITIAL_VALUES,
    validationSchema: userSchema.register,
    onSubmit: async (signUpData: ISignUpClient) => {
      try {
        const { samePassword, ...payload } = signUpData;
        const responce = await mutateAsync({ ...payload });
        if (responce.error) {
          toast.error(responce.error);
        } else {
          toast.success('Confirmation email sent');
          formik.resetForm();
        }
      } catch (e) {
        if (e instanceof Error) toast.error(e.message);
        toast.error('Something went wrong');
      }
    },
    validateOnChange: false
  });

  return <RegisterComponent formik={formik} isLoading={isLoading} />;
};

export default RegisterContainer;
