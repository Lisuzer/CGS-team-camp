import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { StyledPaper, StyledModal, ModalContainer, Title, UserInfoItem } from './user-modal.styled';
import SpinnerLoader from '../../common/components/spinner/spinner.component';
import { APP_KEYS } from '../../common/consts';
import { useLogout } from '../../common/hooks/use-logout';

const UserModalComponent = ({
  isOpen,
  handleTogle
}: {
  isOpen: boolean;
  handleTogle: () => void;
}) => {
  const navigate = useNavigate();
  const logout = useLogout();
  const email = localStorage.getItem(APP_KEYS.STORAGE_KEYS.USER_EMAIL);

  return !email ? (
    <SpinnerLoader />
  ) : (
    <StyledModal open={isOpen} onClose={handleTogle}>
      <StyledPaper>
        <ModalContainer>
          <Grid container justifyContent="flex-end">
            <IconButton style={{ padding: 0 }} onClick={handleTogle}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <Title>My Profile</Title>
          <UserInfoItem>User Email: {email}</UserInfoItem>
          <Grid container justifyContent="space-around">
            <Button
              onClick={() => {
                handleTogle();
                navigate(APP_KEYS.ROUTER_KEYS.CHANGE_PASSWORD);
              }}
            >
              Change password
            </Button>
            <Button
              onClick={() => {
                navigate(APP_KEYS.ROUTER_KEYS.LOGIN);
                logout();
                handleTogle();
              }}
            >
              Logout
            </Button>
          </Grid>
        </ModalContainer>
      </StyledPaper>
    </StyledModal>
  );
};

export default UserModalComponent;
