import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Button } from '@mui/material';
import userService from '../../../service/user.service';
import { APP_KEYS } from '../../common/consts/index';
import { ConfirmationMessage, SuccessPageContainer } from '../auth.styled';
import SpinnerLoader from '../../common/components/spinner/spinner.component';

const SuccessRegisterContainer = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const { isLoading } = useQuery([APP_KEYS.QUERY_KEYS.CONFIRM_EMAIL], async () => {
    try {
      const res = await userService.regiscterConfirm(token || '');
      if (res.error) {
        toast.error(res.error);
        setError(res.error);
      } else {
        setError('');
        toast.success('Email confirmed');
      }
      return res;
    } catch (e) {
      setError('Something went wrong');
      if (e instanceof Error) toast.error(e.message);
      toast.error('Something went wrong');
    }
  });

  return isLoading ? (
    <SpinnerLoader />
  ) : (
    <SuccessPageContainer>
      {!error ? (
        <>
          <ConfirmationMessage>Congrats, you&apos;ve verified your email!</ConfirmationMessage>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate(APP_KEYS.ROUTER_KEYS.LOGIN)}
          >
            Go to LogIn
          </Button>
        </>
      ) : (
        <ConfirmationMessage>Something went wrong</ConfirmationMessage>
      )}
    </SuccessPageContainer>
  );
};

export default SuccessRegisterContainer;
