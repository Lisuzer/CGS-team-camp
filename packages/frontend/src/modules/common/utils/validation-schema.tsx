import * as Yup from 'yup';

export const todoSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  isComplete: Yup.boolean().strict().required('Is Complete is required'),
  isPrivate: Yup.boolean().strict().required('Is Private is required'),
  createdAt: Yup.date()
});

export const userSchema = {
  register: Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(3, 'Password must be at least 3 characters')
      .required('Password is required'),
    samePassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password')
  }),
  login: Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(3, 'Password must be at least 3 characters')
      .required('Password is required')
  }),
  changePassword: Yup.object({
    oldPassword: Yup.string()
      .min(3, 'Password must be at least 3 characters')
      .required('Password is required'),
    newPassword: Yup.string()
      .min(3, 'Password must be at least 3 characters')
      .required('Password is required'),
    samePassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .required('Please confirm your password')
  }),
  resetPassword: Yup.object({
    newPassword: Yup.string()
      .min(3, 'Password must be at least 3 characters')
      .required('Password is required'),
    samePassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .required('Please confirm your password')
  }),
  forgetPassword: Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required')
  })
};
