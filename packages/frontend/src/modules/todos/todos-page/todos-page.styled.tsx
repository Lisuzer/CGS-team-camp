import styled from 'styled-components';
import { Button } from '@mui/material';
import { COLORS, DEVICE, SPACES } from '../../theme';
import { SIZES } from '../../theme/fonts.const';

export const Container = styled.div`
  padding: ${SPACES.sm};
  @media ${DEVICE.tablet} {
    padding: ${SPACES.lg} ${SPACES.md};
  }
  @media ${DEVICE.mobile} {
    padding: ${SPACES.lg} ${SPACES.xs};
  }
`;

export const SliderContainer = styled('div')`
  display: 'flex';
  justifycontent: 'center';
  position: relative;
`;

export const TableContainer = styled('div')`
  height: 600px;
`;

export const TodosTable = styled('div')`
  border: 2px solid ${COLORS.black};
  margin-bottom: ${SPACES.sm};
`;

export const NoTodos = styled('div')`
  margin-top: ${SPACES.sm};
  margin-bottom: ${SPACES.sm};
  font-size: ${SIZES.m};
  font-weight: bold;
  text-align: center;
`;

export const CreateButton = styled(Button)`
  width: 200px;
  height: 30px;
  background-color: transparent;
  margin-bottom: ${SPACES.md};
  display: block;
  cursor: pointer;
  @media ${DEVICE.tablet} {
    width: 140px;
    height: 40px;
  }
  @media ${DEVICE.mobile} {
    width: 140px;
    height: 30px;
    font-size: ${SIZES.sm};
  }
`;
