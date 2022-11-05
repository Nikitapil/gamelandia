import React, { useMemo } from 'react';
import styles from '../../styles/dyno.module.scss';
import cactus from '../../assets/dyno/cactus.png';
import { DynoCactusModel } from '../../models/DynoGame/DynoCactusModel';

interface DynoCactusProps {
  cactusModel: DynoCactusModel;
  fieldWidth: number;
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
