import React from 'react';
import { Pagination } from '@mui/material';
import { ITodosRenderProps } from '../../types/todos.types';
import OneTodo from '../one-todo/one-todo.component';
import { PaginationContainer } from '../one-todo/one-todo.styled';

const TodosMobileComponent = (props: ITodosRenderProps) => {
  const {
    todos,
    onDeleteTodo,
    onCompleteTodo,
    userId,
    onCurrentPageChange,
    currentPage,
    maxPage,
    isLoading
  } = props;
  return (
    <>
      {todos.map((todo, index) => (
        <OneTodo
          userId={userId}
          index={index}
          key={todo.id}
          todo={todo}
          onDelete={() => {
            onDeleteTodo(todo.id);
          }}
          onComplete={onCompleteTodo(todo)}
        />
      ))}
      <PaginationContainer>
        <Pagination
          size="small"
          variant="outlined"
          count={maxPage}
          page={currentPage}
          onChange={onCurrentPageChange}
          disabled={isLoading}
        />
      </PaginationContainer>
    </>
  );
};

export default TodosMobileComponent;
