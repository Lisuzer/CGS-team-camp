import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import todoService from '../../../service/todos.service';
import { APP_KEYS } from '../consts';
import { ITodo } from '../../todos/types/todos.types';

export function useOneTodo() {
  const { id } = useParams();
  const {
    data: queryData,
    refetch,
    isLoading
  } = useQuery<ITodo>([APP_KEYS.QUERY_KEYS.TODO], () => todoService.getOneTodo(id as string), {
    refetchOnMount: true
  });

  const todo = queryData || ({} as ITodo);
  return { todo, refetch, isLoading };
}
