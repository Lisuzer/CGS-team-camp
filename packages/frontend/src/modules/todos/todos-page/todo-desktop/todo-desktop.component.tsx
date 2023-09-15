import React from 'react';
import { Pagination } from '@mui/material';
import { ITodosRenderProps } from '../../types/todos.types';
import { TableContainer, TodosTable } from '../todos-page.styled';
import OneTodo from '../one-todo/one-todo.component';
import {
  Actions,
  Container,
  Description,
  DescriptionText,
  PaginationContainer,
  Title
} from '../one-todo/one-todo.styled';

const TodosDesktopComponent = (props: ITodosRenderProps) => {
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
      <TableContainer>
        <TodosTable>
          <Container isGray={false}>
            <Title>Title</Title>
            <Description>
              <DescriptionText>Description</DescriptionText>
            </Description>
            <Actions>
              <p>Actions</p>
            </Actions>
          </Container>
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
        </TodosTable>
      </TableContainer>
      <PaginationContainer>
        <Pagination
          size="large"
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

export default TodosDesktopComponent;
