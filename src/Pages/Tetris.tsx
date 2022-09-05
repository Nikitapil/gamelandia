import {
  faCircleChevronDown,
  faCircleChevronLeft,
  faCircleChevronRight,
  faCircleChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Auth } from "firebase/auth";
import React, {
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { CommonScoreBoard } from "../components/common/CommonScoreBoard";
import { TetrisBoard } from "../components/Tetris/TetrisBoard";
import { breadcrumbs } from "../constants/breadcrumbs";
import { EGamesWithScoreBoard } from "../domain/scoreTypes";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import { useTitle } from "../hooks/useTitle";
import { TetrisBoardModel } from "../models/tetris/TetrisBoardModel";
import { fetchBoardScores } from "../redux/score/scoreActions";
import { ScoreService } from "../services/scoreService";
import tetrisStyle from "../styles/tetris.module.scss";
import { isMobile } from "../utils/helpers";

interface TetrisProps {
  auth: Auth;
}

export const Tetris = ({ auth }: TetrisProps) => {
  const {t} = useTranslation()
  useTitle('Tetris')
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.tetris]);
  const [board, setBoard] = useState(new TetrisBoardModel());
  const [isShowStartBtn, setIsShowStartBtn] = useState(true);
  const [isShowNewGameBtn, setIsShowNewGameBtn] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const figureInterval = useRef<null | ReturnType<typeof setInterval>>(null);
  const gameRef = useRef<HTMLDivElement>(null);
  const [user] = useAuthState(auth);
  const game = EGamesWithScoreBoard.TETRIS;
  const dispatch = useDispatch();

  const initBoard = () => {
    if (figureInterval.current) {
      clearInterval(figureInterval.current);
    }
    setIsShowStartBtn(true);
    setIsShowNewGameBtn(false);
    setIsGameOver(false);
    setScore(0);
    const newBoard = new TetrisBoardModel();
    newBoard.initCells();
    setBoard(newBoard);
  };

  const gameOver = async () => {
    if (figureInterval.current) {
      clearInterval(figureInterval.current);
    }
    setIsShowNewGameBtn(true);
    setIsGameOver(true);
  };

  const updateScore = async () => {
    await ScoreService.setRecord(score, game);
    dispatch(fetchBoardScores(EGamesWithScoreBoard.TETRIS));
  };

  useEffect(() => {
    initBoard();
  }, []);

  useEffect(() => {
    if (isGameOver && user) {
      updateScore();
    }
  }, [isGameOver, user]);

  const onKeyPress = (e: KeyboardEvent, btnName?: string) => {
    if (e.code === "ArrowRight" || btnName === "right") {
      board.currentFigure?.moveRight();
      const newBoard = board.copyBoard();
      setBoard(newBoard);
    }
    if (e.code === "ArrowLeft" || btnName === "left") {
      board.currentFigure?.moveLeft();
      const newBoard = board.copyBoard();
      setBoard(newBoard);
    }
    if (e.code === "ArrowDown" || btnName === "down") {
      board.currentFigure?.moveDown();
      const newBoard = board.copyBoard();
      setBoard(newBoard);
    }
    if (e.code === "ArrowUp" || btnName === "up") {
      board.currentFigure?.changeDirection();
      const newBoard = board.copyBoard();
      setBoard(newBoard);
    }
  };

  const startMoving = (timer = 1000) => {
    if (figureInterval.current) {
      clearInterval(figureInterval.current);
    }
    board.startGame();
    const newBoard = board.copyBoard();
    setBoard(newBoard);
    figureInterval.current = setInterval(() => {
      if (board.currentFigure!.elems.length < 2) {
        gameOver();
      }
      const move = board.currentFigure?.moveDown();
      if (!move) {
        if (
          board.currentFigure!.elems.some((elem) => elem.cell.y <= 1) ||
          !board.currentFigure
        ) {
          gameOver();
        }
        const addScore = board.clearRows();
        const newBoard = board.copyBoard();
        setBoard(newBoard);
        setScore((prev) => prev + addScore * 10);
        const newTimer = addScore && timer > 400 ? timer - addScore * 4 : timer;
        startMoving(newTimer);
      }
      const newBoard = board.copyBoard();
      setBoard(newBoard);
    }, timer);
  };

  const startGame = () => {
    setIsShowStartBtn(false);
    setIsShowNewGameBtn(true);
    gameRef.current?.focus();
    startMoving();
  };

  const isShowMobileBtns = useMemo(() => {
    return isMobile();
  }, []);

  return (
    <div
      className={`container ${tetrisStyle["tetris-container"]}`}
      onKeyDown={onKeyPress}
      ref={gameRef}
      tabIndex={0}
    >
      <h2 className={`page-title ${tetrisStyle.title}`}>
        <span className={tetrisStyle["color-blue"]}>T</span>
        <span className={tetrisStyle["color-green"]}>e</span>
        <span className={tetrisStyle["color-yellow"]}>t</span>
        <span className={tetrisStyle["color-orange"]}>r</span>
        <span className={tetrisStyle["color-red"]}>i</span>s
      </h2>
      {isGameOver && <p className={tetrisStyle["game-over"]}>Game over</p>}
      <div className={tetrisStyle.controlls}>
        {isShowStartBtn && (
          <button className={tetrisStyle["game-btn"]} onClick={startGame}>
            {t('start_game')}
          </button>
        )}
        {isShowNewGameBtn && (
          <button className={tetrisStyle["game-btn"]} onClick={initBoard}>
            {t('new_game')}
          </button>
        )}
        <p className={tetrisStyle.score}>{t('score')}: {score}</p>
      </div>
      <div className={tetrisStyle["tetris-boards"]}>
        <TetrisBoard board={board} />
        {isShowMobileBtns && (
          <div className={tetrisStyle.mobile__controlls}>
            <button
              onClick={(e: any) => onKeyPress(e, "up")}
              className={tetrisStyle["mobile-controlls__btn"]}
            >
              <FontAwesomeIcon icon={faCircleChevronUp} />
            </button>
            <div className={tetrisStyle["mobile-controlls__sides"]}>
              <button
                onClick={(e: any) => onKeyPress(e, "left")}
                className={tetrisStyle["mobile-controlls__btn"]}
              >
                <FontAwesomeIcon icon={faCircleChevronLeft} />
              </button>
              <button
                onClick={(e: any) => onKeyPress(e, "right")}
                className={tetrisStyle["mobile-controlls__btn"]}
              >
                <FontAwesomeIcon icon={faCircleChevronRight} />
              </button>
            </div>
            <button
              onClick={(e: any) => onKeyPress(e, "down")}
              className={tetrisStyle["mobile-controlls__btn"]}
            >
              <FontAwesomeIcon icon={faCircleChevronDown} />
            </button>
          </div>
        )}
        {user && <CommonScoreBoard user={user} game={game} />}
      </div>
    </div>
  );
};
