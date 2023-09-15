import styled from 'styled-components';
import { Button } from '@mui/material';
import SwitchButton from '../../../common/components/switch-button/switch-button';
import { COLORS, DEVICE, SPACES } from '../../../theme';

export const Title = styled('h3')`
  width: 20%;
  padding-left: 10px;
  border-right: 2px solid ${COLORS.black};
  display: flex;
  align-items: center;
  @media ${DEVICE.tablet} {
    border: none;
    width: 100%;
    margin-bottom: ${SPACES.xs};
  }
`;

export const Description = styled('div')`
  border-color: ${COLORS.black};
  border-right: 2px solid;
  overflow-wrap: break-all;
  word-wrap: break-all;
  overflow-wrap: anywhere;
  word-wrap: break-all;
  width: 60%;
  padding: ${SPACES.xs};
  display: flex;
  align-items: center;
  flex-grow: 1;
  @media ${DEVICE.tablet} {
    border: none;
    width: 100%;
    min-height: 100px;
    align-items: start;
    margin-bottom: ${SPACES.xs};
  }
  @media ${DEVICE.mobile} {
    border: none;
    width: 100%;
    min-height: 100px;
    align-items: start;
    max-height: 200px;
    margin-bottom: ${SPACES.xs};
  }
`;

export const DescriptionText = styled('div')`
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Container = styled('div')<{ isGray: boolean }>`
  display: flex;
  box-sizing: border-box;
  background-color: ${(props) => (props.isGray ? COLORS.lightGray : COLORS.white)};
  @media ${DEVICE.tablet} {
    flex-direction: column;
    border: 2px solid black;
    background-color: transparent;
    justify-content: space-between;
  }
  @media ${DEVICE.mobile} {
    border: none;
    margin-bottom: ${SPACES.sm};
  }
`;

export const ViewButton = styled(Button)`
  margin-right: ${SPACES.xs};
  margin-left: ${SPACES.sm};
  @media ${DEVICE.desktop} {
    margin-right: ${SPACES.xs};
    margin-left: ${SPACES.sm};
  }
`;

export const DeleteButton = styled(Button)`
  margin-right: ${SPACES.sm};
`;

export const ButtonItem = styled(Button)`
  margin-right: ${SPACES.sm};
  @media ${DEVICE.desktop} {
    margin-right: ${SPACES.xs};
  }
`;

export const CompleteButton = styled(SwitchButton)`
  margin-right: ${SPACES.sm};
  @media ${DEVICE.desktop} {
    margin-right: ${SPACES.xs};
  }
`;

export const Actions = styled('div')`
  padding: ${SPACES.xxs} 0;
  border-color: ${COLORS.black};
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 300px;
  @media ${DEVICE.tablet} {
    border: none;
    width: 100%;
    justify-content: space-around;
  }
  @media ${DEVICE.mobile} {
    width: 100%;
    justify-content: space-around;
  }
`;

export const PaginationContainer = styled('div')`
  display: flex;
  justify-content: center;
`;
