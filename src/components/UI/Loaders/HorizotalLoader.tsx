import React, { FC } from 'react';
import '../../../styles/loaders.scss';

interface HorizotalLoaderProps {
  color?: 'white' | 'blue';
}
export const HorizotalLoader: FC<HorizotalLoaderProps> = ({
  color = 'white'
}) => {
  return (
    <div className={`lds-ellipsis ${color}`}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};
