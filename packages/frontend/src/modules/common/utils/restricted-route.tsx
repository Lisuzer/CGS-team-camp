import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import SpinnerLoader from '../components/spinner/spinner.component';
import { APP_KEYS } from '../consts';

const RestrictedRoute = ({ redirectTo }: { redirectTo: string }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem(APP_KEYS.STORAGE_KEYS.TOKEN);
  useEffect(() => {
    if (token) {
      navigate(redirectTo);
    }
  }, [token]);
  return token ? <SpinnerLoader /> : <Outlet />;
};

export default RestrictedRoute;
