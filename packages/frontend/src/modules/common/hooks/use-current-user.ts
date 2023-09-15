import { useQuery } from '@tanstack/react-query';
import userService from '../../../service/user.service';
import { IUser } from '../../auth/types/user.types';
import { APP_KEYS } from '../consts';

export const useGetUser = () => {
  const token = localStorage.getItem(APP_KEYS.STORAGE_KEYS.TOKEN);
  const {
    data: user,
    isSuccess,
    isError,
    isLoading
  } = useQuery<IUser>(
    [APP_KEYS.QUERY_KEYS.GET_USER, token],
    () => userService.getUser(token || ''),
    {
      retry: false
    }
  );

  return { user, isSuccess, isError, isLoading };
};
