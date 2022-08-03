import React, { useEffect, useState } from "react";
import { TicTacBoard } from "../components/TicTacToe/TicTacBoard";
import { breadcrumbs } from "../constants/breadcrumbs";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import { useTitle } from "../hooks/useTitle";
import { TicBoard } from "../models/ticTacToe/TicBoard";
import tictacStyles from "../styles/tictac.module.scss";
export const TicTacToe = () => {
  useTitle('Tic Tac Toe')
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.ticTac]);
  const [board, setBoard] = useState(new TicBoard());
  const [winner, setWinner] = useState("");
  const restart = () => {
    const newBoard = new TicBoard();
    newBoard.initCells();
    setBoard(newBoard);
    setWinner("");
  };

  useEffect(() => {
    restart();
  }, []);

  return (
    <div
      className={`container ${tictacStyles["tic-tac-container"]}`}
      data-testid="tic-tac-page"
    >
      <h1 className={tictacStyles["tic-tac__title"]}>Tic Tac Toe</h1>
      <button className={tictacStyles["tic-tac__restart"]} onClick={restart}>
        Restart
      </button>
      <TicTacBoard
        winner={winner}
        setWinner={setWinner}
        setBoard={setBoard}
        board={board}
      />
    </div>
  );
};
