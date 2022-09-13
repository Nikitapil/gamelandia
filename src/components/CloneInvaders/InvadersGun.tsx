import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpaceAwesome } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import invadersStyles from '../../styles/invaders.module.scss';
import { InvadersGunModel } from '../../models/cloneInvaders/InvadersGunModel';

interface InvadersGunProps {
  gun: InvadersGunModel;
}

export const InvadersGun = ({ gun }: InvadersGunProps) => {
  const style = useMemo(() => {
    return {
      left: gun.x
    };
  }, [gun.x]);

  return (
    <div className={invadersStyles.gun} style={style}>
      <FontAwesomeIcon icon={faSpaceAwesome as IconProp} />
    </div>
  );
};
