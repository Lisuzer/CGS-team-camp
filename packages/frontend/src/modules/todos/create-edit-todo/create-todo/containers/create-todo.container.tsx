import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import todoService from '../../../../../service/todos.service';
import { ITodoCreate } from '../../../types/todos.types';
import { INITIAL_VALUES } from '../../../../common/consts/create-todo.const';
import { todoSchema } from '../../../../common/utils/validation-schema';
import TodoForm from '../../components/todo-fom.component';
import { ROUTER_KEYS } from '../../../../common/consts/app-keys.const';

const CreateTodoContainer = () => {
  const navigate = useNavigate();
  const createTodoMutation = useMutation(todoService.createTodo.bind(todoService));
  const formik = useFormik<ITodoCreate>({
    initialValues: INITIAL_VALUES,
    validationSchema: todoSchema,
    onSubmit: async (todo: ITodoCreate) => {
      await createTodoMutation.mutateAsync(todo);
      formik.resetForm();
      navigate(ROUTER_KEYS.ROOT);
    },
    validateOnChange: true
  });

  return <TodoForm formik={formik} returnTo={ROUTER_KEYS.ROOT} />;
};

export default CreateTodoContainer;
