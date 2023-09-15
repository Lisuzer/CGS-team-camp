import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormikProps } from 'formik';
import { ITodo, ITodoCreate } from '../../types/todos.types';
import CustomInput from '../../../common/components/input/input';
import { StyledButton, Form, IsButton, SwitchWrapper, BackButton } from './todo-form.styled';

const TodoForm = ({
  formik,
  returnTo
}: {
  formik: FormikProps<ITodo> | FormikProps<ITodoCreate>;
  returnTo: string;
}) => {
  const navigate = useNavigate();

  return (
    <Form onSubmit={formik.handleSubmit}>
      <CustomInput
        name="title"
        label="Title"
        placeholder="Enter title"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />
      <CustomInput
        name="description"
        type="textarea"
        label="Description"
        placeholder="Enter description"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.errors.description}
      />
      <SwitchWrapper>
        Complete
        <IsButton name="isComplete" on={formik.values.isComplete} onSwitch={formik.handleChange} />
      </SwitchWrapper>
      <SwitchWrapper>
        Private
        <IsButton name="isPrivate" on={formik.values.isPrivate} onSwitch={formik.handleChange} />
      </SwitchWrapper>
      <StyledButton type="submit">Submit</StyledButton>
      <BackButton
        type="button"
        onClick={() => {
          navigate(returnTo);
        }}
      >
        Back
      </BackButton>
    </Form>
  );
};
export default TodoForm;
