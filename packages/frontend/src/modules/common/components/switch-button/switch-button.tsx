import React from 'react';
import { CheckField, Circle, Container, Wrapper } from './switch-button.styled';
import { ISwitchButtonProps } from '../../types/button.type';

const SwitchButton = (props: ISwitchButtonProps) => {
  const { on, onSwitch, className, name } = props;
  return (
    <Container className={className ?? ''}>
      <Wrapper $on={on}>
        <Circle $on={on} />
        <CheckField name={name} value={name} checked={on} onChange={onSwitch} />
      </Wrapper>
    </Container>
  );
};

export default SwitchButton;
