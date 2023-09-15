import styled from 'styled-components';
import { Typography } from '@mui/material';
import Input from '../common/components/input/input';
import { COLORS, DEVICE, FONTS, SPACES } from '../theme';
import { FAMILIES, SIZES } from '../theme/fonts.const';

export const Container = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${SPACES.lg};
`;

export const Form = styled('form')`
  width: 500px;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const Header = styled(Typography)`
  font-size: 60%;
  margin-top: ${SPACES.md};
  margin-bottom: ${SPACES.sm};
  text-align: center;
`;

export const AuthInput = styled(Input)`
  input {
    height: 40px;
  }
`;
export const AuthButtonContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  width: 230px;
`;

export const ForgetLink = styled('button')`
  display: inline-block;
  width: auto;
  background-color: transparent;
  border: none;
  margin-top: ${SPACES.xs};
  cursor: pointer;
  text-decoration: underline;
  :hover {
    color: ${COLORS.lightBlue};
  }
`;

export const SuccessPageContainer = styled('div')`
  text-align: center;
  font-family: ${FAMILIES.normal};
`;

export const ConfirmationMessage = styled('p')`
  font-size: ${FONTS.SIZES.m};
  margin: 50px 0;
  @media ${DEVICE.mobile} {
    font-size: ${SIZES.s};
    margin: 20px 0;
  }
  @media ${DEVICE.tablet} {
    font-size: ${SIZES.m};
    margin: 40px 0;
  }
  @media ${DEVICE.desktop} {
    font-size: ${SIZES.l};
    margin: 60px 0;
  }
`;
