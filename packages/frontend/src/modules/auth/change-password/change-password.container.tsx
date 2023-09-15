import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { IChangePasswordClient, IChangePasswordServer } from '../types/user.types';
import userService from '../../../service/user.service';
import { INITIAL_VALUES } from './change-password.consts';
import { userSchema } from '../../common/utils/validation-schema';
import ChangePasswordComponent from './change-password.component';
import { APP_KEYS } from '../../common/consts';

const ChangePasswordContainer = () => {
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (changePassword: IChangePasswordServer) =>
      userService.changePassword(changePassword)
  });

  const formik = useFormik<IChangePasswordClient>({
    initialValues: INITIAL_VALUES,
    validationSchema: userSchema.changePassword,
    onSubmit: async (data: IChangePasswordClient) => {
      const { oldPassword, newPassword } = data;
      try {
        const responce = await mutateAsync({ oldPassword, newPassword });
        if (responce.error) {
          toast.error(responce.error);
        } else {
          toast.success('Password successfully changed');
          formik.resetForm();
          navigate(APP_KEYS.ROUTER_KEYS.ROOT);
        }
      } catch (e) {
        if (e instanceof Error) toast.error(e.message);
        toast.error('Something went wrong');
      }
    },
    validateOnChange: true
  });

  return <ChangePasswordComponent formik={formik} isLoading={isLoading} />;
};

export default ChangePasswordContainer;
