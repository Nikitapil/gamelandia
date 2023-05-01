import React, { useMemo } from 'react';
import styles from '../assets/styles/dyno.module.scss';
import cactus from '../assets/images/cactus.png';
import { DynoCactusModel } from '../models/DynoCactusModel';

interface DynoCactusProps {
  cactusModel: DynoCactusModel;
}

export const DynoCactus = ({ cactusModel }: DynoCactusProps) => {
  const style = useMemo(() => {
    return {
      right: `${cactusModel.right}px`
    };
  }, [cactusModel.right]);

  return (
    <div className={styles.cactus} style={style}>
      <img src={cactus} alt="cactus" />
    </div>
  );
};
