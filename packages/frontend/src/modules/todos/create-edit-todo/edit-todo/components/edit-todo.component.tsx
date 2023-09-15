import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { ITodo } from '../../../types/todos.types';
import { todoSchema } from '../../../../common/utils/validation-schema';
import todoService from '../../../../../service/todos.service';
import TodoForm from '../../components/todo-fom.component';
import { ROUTER_KEYS } from '../../../../common/consts/app-keys.const';

const EditTodoComponent = ({ todo }: { todo: ITodo }) => {
  const navigate = useNavigate();
  const editTodoMutation = useMutation(todoService.editTodo.bind(todoService));
  const formik = useFormik<ITodo>({
    initialValues: todo,
    validationSchema: todoSchema,
    onSubmit: async (toEdit) => {
      await editTodoMutation.mutateAsync(toEdit);
      navigate(`${ROUTER_KEYS.VIEW_TODO}/${toEdit.id}`);
      formik.resetForm();
    },
    validateOnChange: true
  });

  return <TodoForm formik={formik} returnTo={`${ROUTER_KEYS.VIEW_TODO}/${todo.id}`} />;
};

export default EditTodoComponent;
