import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { LoaderContainer } from './spinner.styled';
import { ILoaderOptions } from '../../types/loader-options.type';
import { COLORS } from '../../../theme';
import { SIZES } from '../../../theme/fonts.const';

const SpinnerLoader = () => {
  const options: ILoaderOptions = {
    strokeColor: `${COLORS.lightGray}`,
    strokeWidth: `${SIZES.s}`,
    animationDuration: `${SIZES.sm}`,
    width: '96'
  };

  return (
    <LoaderContainer>
      <RotatingLines {...options} />
    </LoaderContainer>
  );
};

export default SpinnerLoader;
