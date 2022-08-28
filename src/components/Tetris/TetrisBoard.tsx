import React from "react";
import { TetrisBoardModel } from "../../models/tetris/TetrisBoardModel";
import { TetrisCell } from "./TetrisCell";
import tetrisStyle from "../../styles/tetris.module.scss";
interface TetrisBoardProps {
  board: TetrisBoardModel;
}

export const TetrisBoard = ({ board }: TetrisBoardProps) => {
  return (
    <div className={tetrisStyle.board}>
      {board.cells.map((row) =>
        row.map((cell, idx) => <TetrisCell cell={cell} key={idx} />)
      )}
    </div>
  );
};
