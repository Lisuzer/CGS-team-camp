import styled, { css } from 'styled-components';
import { Button, Typography } from '@mui/material';
import SwitchButton from '../../../common/components/switch-button/switch-button';
import { DEVICE, SPACES } from '../../../theme';
import { SIZES } from '../../../theme/fonts.const';

export const baseFormStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;
  height: fit-content;
  margin: 0 auto;
  @media ${DEVICE.tablet} {
    width: 400px;
  }
  @media ${DEVICE.mobile} {
    width: 100%;
  }
`;

export const Form = styled('form')`
  ${baseFormStyles}
`;

export const StyledButton = styled(Button).attrs({
  variant: 'contained',
  type: 'submit'
})``;

export const IsButton = styled(SwitchButton)`
  margin-bottom: ${SPACES.xs};
`;

export const Header = styled(Typography)`
  display: none;
  font-size: ${SIZES.l};
  text-align: center;
  margin-top: ${SPACES.l};
`;

export const SwitchWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${SPACES.xs};
  padding: ${SPACES.xs};
`;

export const BackButton = styled(Button).attrs({
  variant: 'contained',
  type: 'button'
})`
  width: 100px;
  height: 30px;
  background-color: transparent;
  @media ${DEVICE.tablet} {
    width: 80px;
    height: 30px;
  }
  @media ${DEVICE.mobile} {
    width: 80px;
    height: 30px;
    font-size: ${SIZES.sm};
  }
`;
