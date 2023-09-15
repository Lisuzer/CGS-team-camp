import { Router } from 'express';
import userController from '../../controllers/user.controller';
import { AddAuthToken, authGetUser, authGetUserFromToken } from '../../middleware/auth.middleware';
import { TryCatch } from '../../middleware/try-catch.middleware';
import validator from '../../validators/generic.validator';
import { userValidationSchema } from '../../validators/schemas.validator';

const router: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
router.post(
  '/register',
  validator.isBody(userValidationSchema.userSchema),
  validator.isNotExistEmail,
  TryCatch(userController.signup.bind(userController))
);

router.get(
  '/register-confirm',
  authGetUserFromToken,
  validator.isBody(userValidationSchema.authSchema),
  TryCatch(userController.signupConfirm.bind(userController))
);

router.post(
  '/reset-password',
  validator.isBody(userValidationSchema.resetPasswordSchema),
  validator.isExistEmail,
  TryCatch(userController.sendResetConfirm.bind(userController))
);

router.put(
  '/reset-password-confirm',
  validator.isBody(userValidationSchema.newPasswordSchema),
  authGetUserFromToken,
  validator.isExistEmail,
  TryCatch(userController.resetPassword.bind(userController))
);

router.put(
  '/change-password',
  validator.isBody(userValidationSchema.changePasswordSchema),
  authGetUser,
  TryCatch(userController.changePassword.bind(userController))
);

router.post(
  '/login',
  validator.isBody(userValidationSchema.userSchema),
  validator.isExistEmail,
  validator.isVerified,
  AddAuthToken(userController.login.bind(userController))
);

router.get('/current', authGetUser, TryCatch(userController.currentUser));

router.get('/todos', authGetUser, TryCatch(userController.currentUserTodos.bind(userController)));

export default router;
