import { Auth } from "firebase/auth";
import React, { FC, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { ScoreBoard } from "../components/snake/ScoreBoard";
import { SnakeBoard } from "../components/snake/SnakeBoard";
import { ESnakeDirections } from "../constants/snake";
import { SnakeBoardModel } from "../models/snake/SnakeBoardModel";
import { fetchSnakeBestScoore } from "../redux/snake/snakeActions";
import { SnakeService } from "../services/SnakeService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronUp,
  faCircleChevronLeft,
  faCircleChevronRight,
  faCircleChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import snakeStyles from "../styles/snake.module.scss";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import { breadcrumbs } from "../constants/breadcrumbs";
interface SnakeProps {
  auth: Auth;
}

export const Snake: FC<SnakeProps> = ({ auth }) => {
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.snake]);
  const [board, setBoard] = useState<SnakeBoardModel | null>(null);
  const [gameOver, setGameOver] = useState("");
  const [isClickAvailable, setIsClickAvailable] = useState(true);
  const [timer, setTimer] = useState(100);
  const [isNewGameButtonDisabled, setIsNewGameButtonDisabled] = useState(false);
  const movingTimeOut = useRef<null | ReturnType<typeof setInterval>>(null);
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const onKeyPress = (e: React.KeyboardEvent, btn: null | string = null) => {
    if (board?.snake && isClickAvailable && !gameOver) {
      if (
        (e.code === "ArrowRight" || btn === "right") &&
        board.snake.direction !== ESnakeDirections.LEFT &&
        board.snake.direction !== ESnakeDirections.RIGHT
      ) {
        board?.snake?.changeDirection(ESnakeDirections.RIGHT);
        startMoving();
        redisableClick();
      }
      if (
        (e.code === "ArrowDown" || btn === "down") &&
        board.snake.direction !== ESnakeDirections.TOP &&
        board.snake.direction !== ESnakeDirections.BOTTOM
      ) {
        board?.snake?.changeDirection(ESnakeDirections.BOTTOM);
        startMoving();
        redisableClick();
      }
      if (
        (e.code === "ArrowUp" || btn === "up") &&
        board.snake.direction !== ESnakeDirections.TOP &&
        board.snake.direction !== ESnakeDirections.BOTTOM
      ) {
        board?.snake?.changeDirection(ESnakeDirections.TOP);
        startMoving();
        redisableClick();
      }
      if (
        (e.code === "ArrowLeft" || btn === "left") &&
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
      setGameOver("GameOver!!!");
      setIsNewGameButtonDisabled(false);
      if (movingTimeOut.current) {
        clearInterval(movingTimeOut.current);
      }
      SnakeService.setRecord(board.score, timer);
      setTimeout(() => {
        dispatch(fetchSnakeBestScoore());
      }, 1500);
    }
  }, [board?.gameOver]);

  return (
    <div
      className={`${snakeStyles.snake__container} container`}
      onKeyDown={onKeyPress}
      data-testid="snake-page"
    >
      <h2 className={snakeStyles.snake__title}>Snake Game</h2>
      <div className={snakeStyles.snake__btns}>
        {!isNewGameButtonDisabled && (
          <button className={snakeStyles.snake__btn} onClick={newGame}>
            New Game
          </button>
        )}
        {!gameOver && (
          <button
            className={snakeStyles.snake__btn}
            onClick={onStartGame}
            data-testid="start-game"
          >
            Start game
          </button>
        )}
        <p>Score: {board?.score}</p>
      </div>
      {!isNewGameButtonDisabled && (
        <div className={snakeStyles.snake__difficulty}>
          <p>Difficulty:</p>
          <button
            className={`${
              timer === 150 ? snakeStyles["snake-current-level"] : ""
            }`}
            onClick={() => setTimer(150)}
            data-testid="easy-level"
          >
            Easy
          </button>
          <button
            className={`${
              timer === 100 ? snakeStyles["snake-current-level"] : ""
            }`}
            onClick={() => setTimer(100)}
            data-testid="medium-level"
          >
            Medium
          </button>
          <button
            className={`${
              timer === 50 ? snakeStyles["snake-current-level"] : ""
            }`}
            onClick={() => setTimer(50)}
            data-testid="hard-level"
          >
            Hard
          </button>
        </div>
      )}
      <p className={snakeStyles["snake__game-over"]}>{gameOver}</p>
      <div className={snakeStyles.snake__boards}>
        <SnakeBoard board={board} />
        <div className={snakeStyles.snake__controlls}>
          <button
            onClick={(e: any) => onKeyPress(e, "up")}
            className={snakeStyles["snake-controlls__btn"]}
          >
            <FontAwesomeIcon icon={faCircleChevronUp} />
          </button>
          <div className={snakeStyles["snake-controlls__sides"]}>
            <button
              onClick={(e: any) => onKeyPress(e, "left")}
              className={snakeStyles["snake-controlls__btn"]}
            >
              <FontAwesomeIcon icon={faCircleChevronLeft} />
            </button>
            <button
              onClick={(e: any) => onKeyPress(e, "right")}
              className={snakeStyles["snake-controlls__btn"]}
            >
              <FontAwesomeIcon icon={faCircleChevronRight} />
            </button>
          </div>
          <button
            onClick={(e: any) => onKeyPress(e, "down")}
            className={snakeStyles["snake-controlls__btn"]}
          >
            <FontAwesomeIcon icon={faCircleChevronDown} />
          </button>
        </div>
        {user && <ScoreBoard user={user} />}
      </div>
    </div>
  );
};
