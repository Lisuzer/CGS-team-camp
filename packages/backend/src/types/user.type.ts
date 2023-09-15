/* eslint-disable import/no-cycle */
import { ITodo } from './todos.type';

export interface IUser {
  id: string;
  email: string;
  password: string;
  isVerified: boolean;
  todos?: ITodo[];
}

export interface IUserCreate extends Omit<IUser, 'id' | 'todos' | 'isVerified'> {}

export interface IAuthPayload {
  id: string;
  email: string;
  todos?: ITodo[];
}

export interface IUserAuth {
  email: string;
  password: string;
}
