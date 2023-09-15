import React from 'react';
import { useOneTodo } from '../../../common/hooks/use-one-todo';
import EditTodoComponent from './components/edit-todo.component';
import { Wrapper } from './edit-todo.styled';

const EditTodoPage = () => {
  const { todo } = useOneTodo();

  return (
    <Wrapper>
      <h1>Edit Todo</h1>
      <EditTodoComponent todo={todo} />
    </Wrapper>
  );
};

export default EditTodoPage;
