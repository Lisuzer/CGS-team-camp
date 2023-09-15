import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../auth/types/user.types';
import { APP_KEYS } from '../consts';

export interface ILoginRes {
  token: string;
  message: {
    id: string;
    email: string;
  };
}

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const login = (user: ILoginRes) => {
    localStorage.setItem(APP_KEYS.STORAGE_KEYS.USER_EMAIL, user.message.email);
    queryClient.setQueryData<IUser>([APP_KEYS.QUERY_KEYS.GET_USER], () => user.message);
    navigate(APP_KEYS.ROUTER_KEYS.ROOT);
  };

  return login;
};
