import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { HeaderWrapper, Nav } from './header.styled';
import { APP_KEYS } from '../../consts';
import UserModalComponent from '../../../auth/user-modal/user-modal.component';

const HeaderComponent = () => {
  const token = localStorage.getItem(APP_KEYS.STORAGE_KEYS.TOKEN);
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleTogle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <HeaderWrapper>
        <Nav>
          <ul>
            <li>
              <Button onClick={() => navigate(APP_KEYS.ROUTER_KEYS.ROOT)}>Home</Button>
            </li>
            {token ? (
              <li>
                <Button onClick={handleTogle}>My profile</Button>
              </li>
            ) : (
              <li>
                <Button onClick={() => navigate(APP_KEYS.ROUTER_KEYS.LOGIN)}>login</Button>
              </li>
            )}
          </ul>
        </Nav>
      </HeaderWrapper>
      {isOpen && token && <UserModalComponent isOpen={isOpen} handleTogle={handleTogle} />}
    </>
  );
};

export default HeaderComponent;
