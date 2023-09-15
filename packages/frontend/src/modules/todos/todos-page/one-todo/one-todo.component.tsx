import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { APP_KEYS } from '../../../common/consts';
import { ITodo } from '../../types/todos.types';
import {
  Description,
  DescriptionText,
  Title,
  Container,
  Actions,
  CompleteButton,
  DeleteButton
} from './one-todo.styled';

export type TodoProps = {
  todo: ITodo;
  onComplete: () => void;
  onDelete: () => void;
  index: number;
  userId: string | undefined;
};

const OneTodo = (props: TodoProps) => {
  const { todo, onComplete, onDelete, userId, index } = props;
  const { id, title, description, isComplete } = todo;
  const navigate = useNavigate();

  const onCompleted = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    onComplete();
  };

  return (
    <Container isGray={index % 2 === 0}>
      <Title>{title}</Title>
      <Description>
        <DescriptionText>{description}</DescriptionText>
      </Description>
      <Actions>
        <Button
          variant="contained"
          onClick={() => {
            navigate(`${APP_KEYS.ROUTER_KEYS.VIEW_TODO}/${id}`);
          }}
        >
          View
        </Button>
        {userId === todo.user?.id ? (
          <>
            <DeleteButton variant="contained" onClick={onDelete}>
              Delete
            </DeleteButton>
            <CompleteButton on={isComplete} onSwitch={onCompleted} name="Complete" />
          </>
        ) : todo.isComplete ? (
          <div style={{ width: '120px' }}>Completed</div>
        ) : (
          <div style={{ width: '120px' }}>Not completed</div>
        )}
      </Actions>
    </Container>
  );
};

export default OneTodo;
