import Joi from 'joi';

export const todoValidationSchema = {
  todoSchema: Joi.object({
    id: Joi.string().uuid(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    isPrivate: Joi.boolean().strict().required(),
    isComplete: Joi.boolean().strict().required(),
    createdAt: Joi.date().iso()
  }),
  updateTodoSchema: Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    isPrivate: Joi.boolean().strict(),
    isComplete: Joi.boolean().strict(),
    createdAt: Joi.date().iso()
  })
};

export const userValidationSchema = {
  resetPasswordSchema: Joi.object({
    email: Joi.string().email().required()
  }),
  authSchema: Joi.object({
    id: Joi.string().uuid().required(),
    email: Joi.string().email().required()
  }),
  changePasswordSchema: Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required()
  }),
  newPasswordSchema: Joi.object({
    password: Joi.string().required()
  }),
  userSchema: Joi.object({
    id: Joi.string().uuid(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    isVerified: Joi.boolean().strict(),
    todos: Joi.array().items(todoValidationSchema.todoSchema)
  })
};
