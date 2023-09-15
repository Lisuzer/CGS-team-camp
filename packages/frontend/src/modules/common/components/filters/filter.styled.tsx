import styled from 'styled-components';
import { Button, Input } from '@mui/material';
import { DEVICE, SPACES } from '../../../theme';

export const SearchInput = styled(Input)`
  width: 300px;
  margin-right: 0;
  margin-left: auto;
  margin-top: ${SPACES.sm};
  display: block;
`;

export const FilterBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media ${DEVICE.tablet} {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: ${SPACES.sm};
  }
`;

export const StyledSelectBox = styled('div')`
  @media ${DEVICE.tablet} {
    margin-top: ${SPACES.sm};
  }
  @media ${DEVICE.mobile} {
    padding: 0;
    margin-left: auto;
  }
`;

export const StyledSearchBox = styled('div')`
  @media ${DEVICE.mobile} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const StyledClearButton = styled(Button).attrs({
  variant: 'contained'
})`
  height: 20px;
  @media ${DEVICE.desktop} {
    height: 30px;
  }
`;
