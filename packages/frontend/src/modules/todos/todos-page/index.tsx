import React, { ChangeEvent, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material';
import { BREAKPOINTS } from '../../theme';
import { APP_KEYS } from '../../common/consts';
import { Container, CreateButton, NoTodos } from './todos-page.styled';
import { ITodosRenderProps } from '../types/todos.types';
import TodosDesktopComponent from './todo-desktop/todo-desktop.component';
import TodosMobileComponent from './todo-mobile/todo-mobile.component';
import TodosTabletComponent from './todo-tablet/todo-tablet.component';
import useCustomMutation from '../../common/hooks/use-custom-mutation';
import { useGetUser } from '../../common/hooks/use-current-user';
import SpinnerLoader from '../../common/components/spinner/spinner.component';
import FilterComponent from '../../common/components/filters/filter.component';
import useGetTodos from '../../common/hooks/user-get-todos';

const TodoPageContainer = () => {
  const isMobile = useMediaQuery({ maxWidth: BREAKPOINTS.mobile });
  const isTablet = useMediaQuery({
    minWidth: BREAKPOINTS.mobile + 1,
    maxWidth: BREAKPOINTS.tablet
  });

  const [currentFilter, setCurrentFilter] = useState('');
  const [search, setSearch] = useState('');
  const [debounceSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { todos, maxPage, isTodosLoading } = useGetTodos({
    currentFilter,
    debounceSearch,
    currentPage
  });

  const token = localStorage.getItem(APP_KEYS.STORAGE_KEYS.TOKEN);
  const { onDeleteTodo, onCompleteTodo } = useCustomMutation();
  const { user, isLoading } = token ? useGetUser() : { user: null, isLoading: false };

  const onSearchChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setSearch(value);
  };

  const handleButtonFilter = (event: SelectChangeEvent) => {
    setCurrentPage(1);
    setCurrentFilter(event.target.value);
  };

  const handleButtonClear = () => {
    setSearch('');
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1);
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [search, 1000]);

  const onCurrentPageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    if (!todos.length) setCurrentPage(1);
    else setCurrentPage(value);
  };

  const todosProps: ITodosRenderProps = {
    todos,
    maxPage,
    currentPage,
    userId: user?.id,
    currentFilter,
    debounceSearch,
    isLoading: isTodosLoading,
    onDeleteTodo,
    onCompleteTodo,
    onCurrentPageChange,
    setCurrentPage
  };

  return isLoading ? (
    <SpinnerLoader />
  ) : (
    <Container>
      {user?.id && (
        <CreateButton
          variant="contained"
          onClick={() => navigate(APP_KEYS.ROUTER_KEYS.CREATE_TODO)}
        >
          Create todo
        </CreateButton>
      )}
      <FilterComponent
        {...{ handleButtonFilter, handleButtonClear, currentFilter, search, onSearchChange }}
      />
      {todos.length ? (
        <>
          {isMobile && <TodosMobileComponent {...todosProps} />}
          {isTablet && <TodosTabletComponent {...todosProps} />}
          {!isMobile && !isTablet && <TodosDesktopComponent {...todosProps} />}
        </>
      ) : (
        <NoTodos>No todos found</NoTodos>
      )}
    </Container>
  );
};

export default TodoPageContainer;
