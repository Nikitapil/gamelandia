import React, { useEffect, useState } from "react";
import { TetrisBoard } from "../components/Tetris/TetrisBoard";
import { TetrisBoardModel } from "../models/tetris/TetrisBoardModel";
import tetrisStyle from '../styles/tetris.module.scss'
export const Tetris = () => {
    const [board, setBoard] = useState(new TetrisBoardModel())

    useEffect(() => {
        const newBoard = new TetrisBoardModel()
        newBoard.initCells()
        setBoard(newBoard)
    }, [])

  return (
    <div className={`container ${tetrisStyle['tetris-container']}`}>
      <h2 className={`page-title ${tetrisStyle.title}`}>
        <span className={tetrisStyle['color-blue']}>T</span>
        <span className={tetrisStyle['color-green']}>e</span>
        <span className={tetrisStyle['color-yellow']}>t</span>
        <span className={tetrisStyle['color-orange']}>r</span>
        <span className={tetrisStyle['color-red']}>i</span>
        s
      </h2>
      <div>
        <TetrisBoard board={board} />
      </div>
    </div>
  );
};
