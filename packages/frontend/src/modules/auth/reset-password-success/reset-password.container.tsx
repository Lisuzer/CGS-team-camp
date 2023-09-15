import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IResetPasswordClient, IResetPasswordServer } from '../types/user.types';
import userService from '../../../service/user.service';
import ResetPasswordComponent from './reset-password.component';
import { userSchema } from '../../common/utils/validation-schema';
import { INITIAL_VALUES } from './reset-password.consts';
import { APP_KEYS } from '../../common/consts';

const ResetPasswordContainer = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (resetPasswordData: IResetPasswordServer) =>
      userService.resetPassword(resetPasswordData)
  });

  const formik = useFormik<IResetPasswordClient>({
    initialValues: INITIAL_VALUES,
    validationSchema: userSchema.resetPassword,
    onSubmit: async (resetPasswordData: IResetPasswordClient) => {
      const { newPassword } = resetPasswordData;
      try {
        const responce = await mutateAsync({ newPassword, token: token || '' });
        if (responce.error) {
          toast.error(responce.error);
        } else {
          toast.success('Password changed');
          formik.resetForm();
          navigate(APP_KEYS.ROUTER_KEYS.LOGIN);
        }
      } catch (e) {
        if (e instanceof Error) toast.error(e.message);
        toast.error('Something went wrong');
      }
    },
    validateOnChange: true
  });

  return <ResetPasswordComponent formik={formik} isLoading={isLoading} />;
};

export default ResetPasswordContainer;
