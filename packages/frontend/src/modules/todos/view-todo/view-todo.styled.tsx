import styled from 'styled-components';
import { Button } from '@mui/material';
import { COLORS, DEVICE, SPACES } from '../../theme';
import { SIZES, WEIGHTS } from '../../theme/fonts.const';

export const Wrapper = styled('div')`
  margin: ${SPACES.m};
  padding: ${SPACES.m};
  background-color: ${COLORS.white};
  border: 1px solid ${COLORS.lightGray};
  border-radius: ${SPACES.s};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  @media ${DEVICE.tablet} {
    padding: ${SPACES.md};
  }
  @media ${DEVICE.mobile} {
    padding: ${SPACES.sm};
  }
`;

export const Header = styled('h1')`
  font-size: ${SIZES.xxl};
  margin-bottom: ${SPACES.md};
  color: ${COLORS.black};
  font-weight: ${WEIGHTS.normal};
  @media ${DEVICE.tablet} {
    font-size: ${SIZES.l};
  }
  @media ${DEVICE.mobile} {
    font-size: ${SIZES.ml};
  }
`;

export const Description = styled('div')`
  margin-bottom: ${SPACES.md};
  font-size: ${SIZES.l};
  color: ${COLORS.secondary};
  @media ${DEVICE.tablet} {
    font-size: ${SIZES.ml};
  }
  @media ${DEVICE.mobile} {
    font-size: ${SIZES.ml};
  }
`;

export const DescriptionText = styled('div')`
  margin-top: ${SPACES.xxs};
  font-weight: ${WEIGHTS.bold};
  font-size: ${SIZES.m};
  @media ${DEVICE.tablet} {
    font-size: ${SIZES.m};
  }
  @media ${DEVICE.mobile} {
    font-size: ${SIZES.smm};
  }
`;

export const ButtonWrapper = styled('div')`
  margin-top: ${SPACES.xxl};
  display: column;
  align-items: center;
  width: 100%;
  @media ${DEVICE.mobile} {
    margin-top: ${SPACES.lg};
  }
`;

export const ButtonItem = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-top: ${SPACES.xs};
  font-size: ${SIZES.ml};
  @media ${DEVICE.tablet} {
    font-size: ${SIZES.m};
  }
  @media ${DEVICE.mobile} {
    font-size: ${SIZES.m};
  }
`;

export const NavButton = styled(Button).attrs({
  variant: 'contained'
})``;

export const RouteButtonWrapper = styled('div')`
  margin-top: ${SPACES.xxl};
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  @media ${DEVICE.mobile} {
    margin-top: ${SPACES.lg};
  }
`;

export const InfoComplete = styled('div')`
  display: flex;
  justify-content: end;
  margin-top: ${SPACES.xs};
  font-size: ${SIZES.m};
  @media ${DEVICE.tablet} {
    font-size: ${SIZES.m};
  }
  @media ${DEVICE.mobile} {
    font-size: ${SIZES.smm};
  }
`;
