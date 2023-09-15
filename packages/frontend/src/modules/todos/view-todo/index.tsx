import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import todoService from '../../../service/todos.service';
import { useOneTodo } from '../../common/hooks/use-one-todo';
import {
  ButtonItem,
  ButtonWrapper,
  Description,
  DescriptionText,
  Header,
  InfoComplete,
  NavButton,
  RouteButtonWrapper,
  Wrapper
} from './view-todo.styled';
import SwitchButton from '../../common/components/switch-button/switch-button';
import { APP_KEYS } from '../../common/consts';
import SpinnerLoader from '../../common/components/spinner/spinner.component';
import { useGetUser } from '../../common/hooks/use-current-user';

const ViewTodoPage = () => {
  const { todo, isLoading } = useOneTodo();
  const navigate = useNavigate();
  const quaryClient = useQueryClient();
  const token = localStorage.getItem(APP_KEYS.STORAGE_KEYS.TOKEN);
  const { user } = token ? useGetUser() : { user: null };

  const editTodoMutation = useMutation(todoService.editTodo.bind(todoService), {
    onSuccess: () => {
      quaryClient.invalidateQueries([APP_KEYS.QUERY_KEYS.TODO]);
    }
  });

  const onCompleteTodo = () => {
    if (!todo) return;
    const { isComplete, ...rest } = todo;
    editTodoMutation.mutate({ isComplete: !isComplete, ...rest });
  };

  const onPrivateTodo = () => {
    if (!todo) return;
    const { isPrivate, ...rest } = todo;
    editTodoMutation.mutate({ isPrivate: !isPrivate, ...rest });
  };

  return isLoading ? (
    <SpinnerLoader />
  ) : (
    <Wrapper>
      <Header>{todo?.title}</Header>
      <Description>
        Description
        <DescriptionText>{todo?.description}</DescriptionText>
      </Description>
      {user && user.id === todo?.user?.id ? (
        <ButtonWrapper>
          <ButtonItem>
            {todo.isComplete ? 'Completed' : 'Complete'}
            <SwitchButton
              onSwitch={() => onCompleteTodo()}
              on={todo.isComplete ?? false}
              name="isComplete"
            />
          </ButtonItem>
          <ButtonItem>
            {todo.isPrivate ? 'Private' : 'Mark as private'}
            <SwitchButton
              onSwitch={() => onPrivateTodo()}
              on={todo.isPrivate ?? false}
              name="isPrivate"
            />
          </ButtonItem>
        </ButtonWrapper>
      ) : (
        <InfoComplete>{todo.isComplete ? <p>Completed</p> : <p>Not completed</p>}</InfoComplete>
      )}
      <RouteButtonWrapper>
        <NavButton onClick={() => navigate(APP_KEYS.ROUTER_KEYS.ROOT)}>Back</NavButton>
        {user && user.id === todo?.user?.id && (
          <NavButton onClick={() => navigate(`${APP_KEYS.ROUTER_KEYS.EDIT_TODO}/${todo.id}`)}>
            Edit
          </NavButton>
        )}
      </RouteButtonWrapper>
    </Wrapper>
  );
};

export default ViewTodoPage;
