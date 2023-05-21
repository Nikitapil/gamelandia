import React, { useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpaghettiMonsterFlying } from '@fortawesome/free-solid-svg-icons';
import styles from '../assets/styles/invaders.module.scss';
import { InvadersCellModel } from '../models/InvadersCellModel';
import { InvadersBulletModel } from '../models/InvadersBulletModel';
import { EInvadersDirections } from '../types';
import { INVADERS_FIELD_HEIGHT, INVADERS_FIELD_X_END, INVADERS_FIELD_Y_END } from '../constants';

interface IInvadersCellProps {
  cell: InvadersCellModel;
  bullet: InvadersBulletModel | null;
  destroyBullet: () => void;
  increaseScore: () => void;
  gameOver: () => void;
}

export const InvadersCell = ({
  cell,
  bullet,
  destroyBullet,
  increaseScore,
  gameOver
}: IInvadersCellProps) => {
  const cellStyle = useMemo(() => {
    return {
      top: `${cell.y}px`,
      left: `${cell.x}px`
    };
  }, [cell.x, cell.y]);

  useEffect(() => {
    if (cell.isWithElem) {
      if (
        (cell.x >= INVADERS_FIELD_X_END && cell.field.direction === EInvadersDirections.RIGHT) ||
        (cell.x <= 0 &&
          !cell.field.isFirstMove &&
          cell.field.direction === EInvadersDirections.LEFT)
      ) {
        cell.changeDirection();
      }

      if (cell.y >= INVADERS_FIELD_Y_END) {
        gameOver();
        return;
      }

      if (bullet) {
        const inTheArea =
          bullet.x >= cell.x &&
          bullet.x <= cell.cellEnd.xEnd &&
          bullet.y <= INVADERS_FIELD_HEIGHT - cell.y &&
          bullet.y >= INVADERS_FIELD_HEIGHT - cell.cellEnd.yEnd;
        if (inTheArea) {
          cell.destroyElem();
          destroyBullet();
          increaseScore();
        }
      }
    }
  }, [cell.x, cell, gameOver, bullet, destroyBullet, increaseScore]);

  return (
    <div
      className={styles.cell}
      style={cellStyle}
    >
      {cell.isWithElem && <FontAwesomeIcon icon={faSpaghettiMonsterFlying} />}
    </div>
  );
};
