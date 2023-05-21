import React, { useMemo } from 'react';
import { InvadersBulletModel } from '../models/InvadersBulletModel';
import styles from '../assets/styles/invaders.module.scss';

interface IInvadersBulletProps {
  bullet: InvadersBulletModel;
}
export const InvadersBullet = ({ bullet }: IInvadersBulletProps) => {
  const style = useMemo(() => {
    return {
      left: `${bullet.x}px`,
      bottom: `${bullet.y}px`
    };
  }, [bullet.x, bullet.y]);

  return (
    <div
      className={styles.bullet}
      style={style}
    />
  );
};
