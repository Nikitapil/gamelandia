import React, { FC, memo } from 'react';
import { SnakeBoardModel } from '../models/SnakeBoardModel';
import { SnakeCell } from './SnakeCell';
import snakeStyle from '../assets/styles/snake.module.scss';

interface SnakeBoardProps {
  board: SnakeBoardModel | null;
}

export const SnakeBoard: FC<SnakeBoardProps> = memo(
  ({ board }: SnakeBoardProps) => {
    return (
      <div className={snakeStyle['snake-board']} data-testid="snake-board">
        {board?.cells.map((row) =>
          row.map((cell) => <SnakeCell cell={cell} key={cell.id} />)
        )}
      </div>
    );
  }
);
