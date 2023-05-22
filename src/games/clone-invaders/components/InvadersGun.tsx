import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpaceAwesome } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from '../assets/styles/invaders.module.scss';
import { InvadersGunModel } from '../models/InvadersGunModel';

interface IInvadersGunProps {
  gun: InvadersGunModel;
}

export const InvadersGun = ({ gun }: IInvadersGunProps) => {
  const style = useMemo(() => {
    return {
      left: gun.x
    };
  }, [gun.x]);

  return (
    <div
      className={styles.gun}
      style={style}
    >
      <FontAwesomeIcon icon={faSpaceAwesome as IconProp} />
    </div>
  );
};
