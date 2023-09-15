import { useQueryClient } from '@tanstack/react-query';
import { IUser } from '../../auth/types/user.types';
import { APP_KEYS } from '../consts';

export const useLogout = () => {
  const queryClient = useQueryClient();

  const logout = () => {
    localStorage.removeItem(APP_KEYS.STORAGE_KEYS.USER_EMAIL);
    localStorage.removeItem(APP_KEYS.STORAGE_KEYS.TOKEN);
    queryClient.setQueryData<IUser | undefined>([APP_KEYS.QUERY_KEYS.GET_USER], () => undefined);
  };

  return logout;
};
