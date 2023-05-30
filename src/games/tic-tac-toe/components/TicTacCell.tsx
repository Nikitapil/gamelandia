import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { ticTacIcons } from '../constants';
import { TicCell } from '../models/TicCell';
import styles from '../assets/styles/tictac.module.scss';

interface ITicTacCellProps {
  cell: TicCell;
  clickOnCell: (cell: TicCell) => void;
}

export const TicTacCell: FC<ITicTacCellProps> = ({ cell, clickOnCell }) => {
  const clickHandler = () => {
    clickOnCell(cell);
  };

  return (
    <div
      data-testid="tic-tac-cell"
      onClick={clickHandler}
      className={styles['tictac-cell']}
    >
      {cell.icon && <FontAwesomeIcon icon={ticTacIcons[cell.icon]} />}
    </div>
  );
};
