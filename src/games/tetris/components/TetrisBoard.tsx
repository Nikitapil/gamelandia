import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TetrisBoardModel } from '../models/TetrisBoardModel';
import { TetrisCell } from './TetrisCell';
import tetrisStyle from '../assets/styles/tetris.module.scss';

interface ITetrisBoardProps {
  board: TetrisBoardModel;
}

export const TetrisBoard = ({ board }: ITetrisBoardProps) => {
  return (
    <div className={tetrisStyle.board}>
      {board.cells.map((row) =>
        row.map((cell) => (
          <TetrisCell
            cell={cell}
            key={uuidv4()}
          />
        ))
      )}
    </div>
  );
};
