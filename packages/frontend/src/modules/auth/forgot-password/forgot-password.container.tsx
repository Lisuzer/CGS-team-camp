import React from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import userService from '../../../service/user.service';
import ForgotPasswordComponent from './forgot-password.component';
import { INITIAL_VALUES } from './forgot-password.consts';
import { userSchema } from '../../common/utils/validation-schema';

const ForgotPasswordContainer = () => {
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (email: string) => userService.forgetPassword(email)
  });
  const formik = useFormik<{ email: string }>({
    initialValues: INITIAL_VALUES,
    validationSchema: userSchema.forgetPassword,
    onSubmit: async ({ email }: { email: string }) => {
      try {
        const responce = await mutateAsync(email);
        if (responce.error) {
          toast.error(responce.error);
        } else {
          toast.success(responce.message);
          formik.resetForm();
        }
      } catch (e) {
        if (e instanceof Error) toast.error(e.message);
        toast.error('Something went wrong');
      }
    },
    validateOnChange: true
  });

  return <ForgotPasswordComponent formik={formik} isLoading={isLoading} />;
};

export default ForgotPasswordContainer;
