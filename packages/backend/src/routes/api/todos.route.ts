import { Router } from 'express';
import todoController from '../../controllers/todo.controller';
import { todoValidationSchema } from '../../validators/schemas.validator';
import validator from '../../validators/generic.validator';
import { TryCatch } from '../../middleware/try-catch.middleware';
import { Todo } from '../../entities/todo.entity';
import { authGetUser, optionalAuthGetUser } from '../../middleware/auth.middleware';

const todosRouter: Router = Router();

todosRouter.get('', optionalAuthGetUser, TryCatch(todoController.getAllTodo.bind(todoController)));
todosRouter.get(
  '/:id',
  validator.isExist(Todo),
  optionalAuthGetUser,
  TryCatch(todoController.getTodoById.bind(todoController))
);
todosRouter.post(
  '',
  validator.isBody(todoValidationSchema.todoSchema),
  authGetUser,
  TryCatch(todoController.createNewTodo.bind(todoController))
);
todosRouter.put(
  '/:id',
  validator.isExist(Todo),
  validator.isBody(todoValidationSchema.updateTodoSchema),
  authGetUser,
  validator.isOwner,
  TryCatch(todoController.updateTodoById.bind(todoController))
);
todosRouter.delete(
  '/:id',
  validator.isExist(Todo),
  authGetUser,
  validator.isOwner,
  TryCatch(todoController.deleteTodoById.bind(todoController))
);

export default todosRouter;
