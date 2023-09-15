import { useMutation, useQueryClient } from '@tanstack/react-query';
import todoService from '../../../service/todos.service';
import { ITodo } from '../../todos/types/todos.types';
import { QUERY_KEYS } from '../consts/app-keys.const';

function useCustomMutation() {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation(todoService.deleteTodo.bind(todoService), {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.TODOS]);
      queryClient.setQueryData<ITodo[]>([QUERY_KEYS.TODOS], () => undefined);
    }
  });

  const completeTodoMutation = useMutation(todoService.editTodo.bind(todoService), {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.TODOS]);
    }
  });

  const onDeleteTodo = (id: string) => {
    deleteTodoMutation.mutate(id);
  };

  const onCompleteTodo = (todo: ITodo) => () => {
    todo.isComplete = !todo.isComplete;
    completeTodoMutation.mutate({ ...todo });
  };

  return {
    onDeleteTodo,
    onCompleteTodo
  };
}

export default useCustomMutation;
