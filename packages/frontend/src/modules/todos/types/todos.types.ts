import { IUser } from '../../auth/types/user.types';

export interface ITodo {
  id: string;
  title: string;
  description: string;
  isPrivate: boolean;
  isComplete: boolean;
  user?: IUser;
  createdAt?: Date;
}

export interface ITodoCreate extends Omit<ITodo, 'id'> {}

export interface IPageTodo {
  todos: ITodo[];
  totalTodos: number;
  hasNextPage: boolean;
  page: number;
}

export interface ITodosRenderProps {
  todosTablet?: ITodo[];
  todos: ITodo[];
  userId?: string | undefined;
  maxPage: number;
  currentPage: number;
  currentFilter: string;
  debounceSearch: string;
  isLoading: boolean;
  onDeleteTodo: (id: string) => void;
  onCompleteTodo: (todo: ITodo) => () => void;
  onCurrentPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface ITodosTabletProps extends Omit<ITodosRenderProps, 'todos'> {
  todosTablet: ITodo[];
}

export interface ITodoGetAllParams {
  status: string | null;
  search: string | null;
  page: number | null;
  limit: number | null;
}

export interface IPagedTodos {
  todos: ITodo[];
  maxPage: number;
  page: number;
}
