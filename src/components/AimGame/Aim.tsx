import React, { useMemo } from 'react';
import styles from '../../styles/aimgame.module.scss';
import { AimModel } from '../../models/aimgame/AimModel';

interface AimProps {
  aimDot: AimModel;
  updateDot: () => void;
}

export const Aim = ({ aimDot, updateDot }: AimProps) => {
  const dotStyles = useMemo(() => {
    return {
      width: `${aimDot.size}px`,
      height: `${aimDot.size}px`,
      top: `${aimDot.top}px`,
      left: `${aimDot.left}px`
    };
  }, [aimDot]);

  return (
    <div
      className={styles.aim}
      style={dotStyles}
      onClick={updateDot}
      data-testid="aim-dot"
    />
  );
};
