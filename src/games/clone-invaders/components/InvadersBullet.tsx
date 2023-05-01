import React, { useMemo } from 'react';
import { InvadersBulletModel } from '../models/InvadersBulletModel';
import invadersStyles from '../assets/styles/invaders.module.scss';

interface InvadersBulletProps {
  bullet: InvadersBulletModel;
}
export const InvadersBullet = ({ bullet }: InvadersBulletProps) => {
  const style = useMemo(() => {
    return {
      left: `${bullet.x}px`,
      bottom: `${bullet.y}px`
    };
  }, [bullet.x, bullet.y]);

  return <div className={invadersStyles.bullet} style={style} />;
};
