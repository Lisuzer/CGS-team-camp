import React from 'react';
import CreateTodoContainer from './containers/create-todo.container';
import { CreateWrapper } from './create-todo.styled';

const CreateTodoPage = () => (
  <CreateWrapper>
    <h1>Create Todo Page</h1>
    <CreateTodoContainer />
  </CreateWrapper>
);

export default CreateTodoPage;
