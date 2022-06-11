import React, { useEffect, useRef, useState } from "react";
import { SnakeBoard } from "../components/snake/SnakeBoard";
import { ESnakeDirections } from "../constants/snake";
import { SnakeBoardModel } from "../models/snake/SnakeBoardModel";
import "../styles/snake.scss";
export const Snake = () => {
  const [board, setBoard] = useState<SnakeBoardModel | null>(null);
  const [gameOver, setGameOver] = useState("");
  const [isClickAvailable, setIsClickAvailable] = useState(true);
  const [timer, setTimer] = useState(100);
  const [isNewGameButtonDisabled, setIsNewGameButtonDisabled] = useState(false);
  const movingTimeOut = useRef<null | ReturnType<typeof setInterval>>(null);

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (board?.snake && isClickAvailable && !gameOver) {
      if (
        e.code === "ArrowRight" &&
        board.snake.direction !== ESnakeDirections.LEFT &&
        board.snake.direction !== ESnakeDirections.RIGHT
      ) {
        board?.snake?.changeDirection(ESnakeDirections.RIGHT);
        startMoving();
        redisableClick();
      }
      if (
        e.code === "ArrowDown" &&
        board.snake.direction !== ESnakeDirections.TOP &&
        board.snake.direction !== ESnakeDirections.BOTTOM
      ) {
        board?.snake?.changeDirection(ESnakeDirections.BOTTOM);
        startMoving();
        redisableClick();
      }
      if (
        e.code === "ArrowUp" &&
        board.snake.direction !== ESnakeDirections.TOP &&
        board.snake.direction !== ESnakeDirections.BOTTOM
      ) {
        board?.snake?.changeDirection(ESnakeDirections.TOP);
        startMoving();
        redisableClick();
      }
      if (
        e.code === "ArrowLeft" &&
        board.snake.direction !== ESnakeDirections.LEFT &&
        board.snake.direction !== ESnakeDirections.RIGHT
      ) {
        board?.snake?.changeDirection(ESnakeDirections.LEFT);
        startMoving();
        redisableClick();
      }
    }
  };

  const redisableClick = () => {
    setIsClickAvailable(false);
    setTimeout(() => {
      setIsClickAvailable(true);
    }, timer);
  };

  useEffect(() => {
    newGame();
  }, []);

  const newGame = () => {
    setGameOver("");
    const newBoard = new SnakeBoardModel();
    newBoard.initCells();
    newBoard?.addSnake();
    newBoard?.addFood();
    setBoard(newBoard);
  };

  const onStartGame = () => {
    if (!isNewGameButtonDisabled) {
      setIsNewGameButtonDisabled(true);
      startMoving();
    }
  };

  const onMove = () => {
    board?.snake?.move();
    setBoard(board?.updateBoard()!);
  };

  const startMoving = () => {
    if (movingTimeOut.current) {
      clearInterval(movingTimeOut.current);
    }
    movingTimeOut.current = setInterval(onMove, timer);
  };

  useEffect(() => {
    if (board?.gameOver) {
      setGameOver("GameOver");
      setIsNewGameButtonDisabled(false);
      if (movingTimeOut.current) {
        clearInterval(movingTimeOut.current);
      }
    }
  }, [board?.gameOver]);

  return (
    <div className="snake__container container" onKeyDown={onKeyPress}>
      <h2 className="snake__title">Snake Game</h2>
      <div className="snake__btns">
        {!isNewGameButtonDisabled && (
          <button className="snake__btn" onClick={newGame}>
            New Game
          </button>
        )}
        {!gameOver && (
          <button className="snake__btn" onClick={onStartGame}>
            Start game
          </button>
        )}
        <p>Score: {board?.score}</p>
      </div>
      {!isNewGameButtonDisabled && (
        <div className="snake__difficulty">
          <p>Difficulty:</p>
          <button
            className={`${timer === 150 ? "snake-current-level" : ""}`}
            onClick={() => setTimer(150)}
          >
            Easy
          </button>
          <button
            className={`${timer === 100 ? "snake-current-level" : ""}`}
            onClick={() => setTimer(100)}
          >
            Medium
          </button>
          <button
            className={`${timer === 50 ? "snake-current-level" : ""}`}
            onClick={() => setTimer(50)}
          >
            Hard
          </button>
        </div>
      )}
      <p>{gameOver}</p>
      <SnakeBoard board={board} />
    </div>
  );
};
