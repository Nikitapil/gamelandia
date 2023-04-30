import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useMemo } from 'react';
import { faAppleWhole } from '@fortawesome/free-solid-svg-icons';
import { SnakeCellModel } from '../models/SnakeCellModel';
import snakeStyle from '../assets/styles/snake.module.scss';

interface SnakeCellProps {
  cell: SnakeCellModel;
}

export const SnakeCell: FC<SnakeCellProps> = ({ cell }) => {
  const classes = useMemo(() => {
    const base = snakeStyle['snake-cell'];
    if (cell.elem) {
      return `${base} ${snakeStyle['with-snake']}`;
    }
    return base;
  }, [cell.elem]);

  return (
    <div className={classes}>
      {cell.food && <FontAwesomeIcon icon={faAppleWhole} />}
    </div>
  );
};
