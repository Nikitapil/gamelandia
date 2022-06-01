import React, { useEffect, useState } from "react";
import { ChessBoardComponent } from "../components/Chess/ChessBoardComponent";
import { ChessTimer } from "../components/Chess/ChessTimer";
import { LostFigures } from "../components/Chess/LostFigures";
import { WinnerModal } from "../components/Chess/WinnerModal";
import { Board } from "../models/chess/Board";
import { Colors } from "../models/chess/Colors";
import { Player } from "../models/chess/Player";
import "../styles/chess.scss";
export const Chess = () => {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(true);
  const [winner, setWinner] = useState("");
  const restart = () => {
    setWinner("");
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  };

  const endGame = (color?: string) => {
    if (!color) {
      const winColor =
        currentPlayer?.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
      setWinner(winColor);
    }
  };

  const newGame = () => {
    setWinner("");
    setIsTimerModalOpen(true);
  };

  const swapPlayer = () => {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
  };

  return (
    <div className="chess container">
      <div className="chess_timer">
        <ChessTimer
          currentPlayer={currentPlayer}
          restart={restart}
          endGame={endGame}
          isModalOpen={isTimerModalOpen}
          setIsModalOpen={setIsTimerModalOpen}
          setWinner={setWinner}
        />
        <button className="chess__give-up" onClick={() => endGame()}>
          Give Up
        </button>
      </div>
      <ChessBoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <div className="lost">
        <LostFigures title="Black" figures={board.lostBlackFigures} />
        <LostFigures title="White" figures={board.lostWhightFigures} />
      </div>
      {winner && <WinnerModal newGame={newGame} color={winner} />}
    </div>
  );
};
