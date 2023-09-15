import { Grid, Modal } from '@mui/material';
import styled from 'styled-components';
import { DEVICE, SPACES } from '../../theme';
import { SIZES, WEIGHTS } from '../../theme/fonts.const';

export const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledPaper = styled('div')`
  position: absolute;
  background-color: white;
  padding: ${SPACES.m};
  outline: none;
  border-radius: 10px;
  height: 200px;
  @media (${DEVICE.desktop}) {
    width: 400px;
  }
  @media (${DEVICE.tablet}) {
    width: 300px;
    height: auto;
  }
  @media (${DEVICE.mobile}) {
    width: 250px;
    height: auto;
  }
`;

export const StyledGrid = styled(Grid).attrs({
  item: true
})``;

export const ModalContainer = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Title = styled('h3')`
  margin: 0 auto;
  font-size: ${SIZES.ml};
  font-weight: ${WEIGHTS.normal};
  @media (${DEVICE.mobile}) {
    font-size: ${SIZES.m};
  }
`;

export const UserInfoItem = styled('p')`
  margin: ${SPACES.m} auto;
`;
