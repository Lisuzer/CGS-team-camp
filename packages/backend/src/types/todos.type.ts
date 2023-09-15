/* eslint-disable import/no-cycle */
import { User } from '../entities/user.entity';
/* eslint-disable import/no-cycle */
import { IUser } from './user.type';

export interface ITodo {
  id?: string;
  title: string;
  description: string;
  isPrivate: boolean;
  isComplete: boolean;
  user: IUser | User;
}

export interface ITodoFilters {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  isTablet?: string;
}

export interface IGetAllTodo {
  id: string | undefined;
  search: string | undefined;
  status: string | undefined;
  page: number | undefined;
  limit: number | undefined;
  isTablet: string | undefined;
}

export type TUpdateTodo = Partial<Omit<ITodo, 'id'>>;
