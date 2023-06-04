import React, { memo } from 'react';
import { SnakeBoardModel } from '../models/SnakeBoardModel';
import { SnakeCell } from './SnakeCell';
import styles from '../assets/styles/snake.module.scss';

interface ISnakeBoardProps {
  board: SnakeBoardModel | null;
}

export const SnakeBoard = memo(({ board }: ISnakeBoardProps) => {
  return (
    <div
      className={styles['snake-board']}
      data-testid="snake-board"
    >
      {board?.cells.map((row) =>
        row.map((cell) => (
          <SnakeCell
            cell={cell}
            key={cell.id}
          />
        ))
      )}
    </div>
  );
});
