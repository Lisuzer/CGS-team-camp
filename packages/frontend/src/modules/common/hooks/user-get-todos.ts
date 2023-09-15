import { useQuery } from '@tanstack/react-query';
import { APP_KEYS } from '../consts';
import { IPagedTodos } from '../../todos/types/todos.types';
import todoService from '../../../service/todos.service';
import { LIMIT } from '../../todos/todos-page/todos-page.consts';

const useGetTodos = ({
  currentPage,
  currentFilter,
  debounceSearch
}: {
  currentPage: number;
  currentFilter: string;
  debounceSearch: string;
}) => {
  const {
    data: { todos = [], maxPage = 1 } = {
      todos: [],
      maxPage: 1
    },
    isLoading: isTodosLoading
  } = useQuery<IPagedTodos>({
    queryKey: [APP_KEYS.QUERY_KEYS.TODOS, debounceSearch, currentFilter, currentPage],
    queryFn: () =>
      todoService.getAllTodos({
        search: debounceSearch,
        status: currentFilter,
        page: currentPage,
        limit: LIMIT
      }),
    refetchOnMount: true
  });

  return { todos, maxPage, isTodosLoading };
};

export default useGetTodos;
