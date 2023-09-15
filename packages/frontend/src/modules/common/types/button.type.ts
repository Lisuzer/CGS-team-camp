import { ChangeEvent } from 'react';

export interface IGoBackButtonProps {
  path: string;
}

export interface ISwitchButtonProps {
  on: boolean;
  onSwitch: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
  name: string;
  label?: string;
}
