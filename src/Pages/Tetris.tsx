import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { TetrisBoard } from "../components/Tetris/TetrisBoard";
import { TetrisBoardModel } from "../models/tetris/TetrisBoardModel";
import tetrisStyle from '../styles/tetris.module.scss'
export const Tetris = () => {
    const [board, setBoard] = useState(new TetrisBoardModel())
    const [isShowStartBtn, setIsShowStartBtn] = useState(true)
    const [isShowNewGameBtn, setIsShowNewGameBtn] = useState(false)
    const [isGameOver, setIsGameOver] = useState(false)
    const [score, setScore] = useState(0)
    const figureInterval = useRef<null | ReturnType<typeof setInterval>>(null)
    const gameRef = useRef<HTMLDivElement>(null)
    const initBoard = () => {
      if (figureInterval.current) {
        clearInterval(figureInterval.current)
      }
      setIsShowStartBtn(true)
      setIsShowNewGameBtn(false)
      setIsGameOver(false)
      setScore(0)
      const newBoard = new TetrisBoardModel()
      newBoard.initCells()
      setBoard(newBoard)
    }

    const gameOver = () => {
      if (figureInterval.current) {
        clearInterval(figureInterval.current)
      }
      setIsShowNewGameBtn(true)
      setIsGameOver(true)
    }


    useEffect(() => {
        initBoard()
    }, [])

    

    const onKeyPress = (e:KeyboardEvent) => {
        if(e.code === "ArrowRight") {
          board.currentFigure?.moveRight()
          const newBoard = board.copyBoard()
          setBoard(newBoard)
        }
        if(e.code === "ArrowLeft") {
          board.currentFigure?.moveLeft()
          const newBoard = board.copyBoard()
          setBoard(newBoard)
        }
        if(e.code === "ArrowDown") {
          board.currentFigure?.moveDown()
          const newBoard = board.copyBoard()
          setBoard(newBoard)
        }
        if(e.code === "ArrowUp") {
          board.currentFigure?.changeDirection()
          const newBoard = board.copyBoard()
          setBoard(newBoard)
        }
    }

    const startMoving = (timer = 1000) => {
      if (figureInterval.current) {
        clearInterval(figureInterval.current)
      }
      board.startGame()
      const newBoard = board.copyBoard()
      setBoard(newBoard)
      figureInterval.current = setInterval(() => {
        const move = board.currentFigure?.moveDown()
        if (!move) {
          if (board.currentFigure!.elems.some(elem => elem.cell.y <= 1)) {
            gameOver()
          }
          const addScore = board.clearRows()
          const newBoard = board.copyBoard()
          setBoard(newBoard)
          setScore(prev => prev + addScore * 10)
          const newTimer = addScore && timer > 450 ? timer - addScore : timer
          startMoving(newTimer)
        }
        const newBoard = board.copyBoard()
        setBoard(newBoard)
      }, timer)
    }

    const startGame = () => {
      setIsShowStartBtn(false)
      setIsShowNewGameBtn(true)
      gameRef.current?.focus()
      startMoving()
    }

  return (
    <div className={`container ${tetrisStyle['tetris-container']}`} onKeyDown={onKeyPress} ref={gameRef} tabIndex={0}>
      <h2 className={`page-title ${tetrisStyle.title}`}>
        <span className={tetrisStyle['color-blue']}>T</span>
        <span className={tetrisStyle['color-green']}>e</span>
        <span className={tetrisStyle['color-yellow']}>t</span>
        <span className={tetrisStyle['color-orange']}>r</span>
        <span className={tetrisStyle['color-red']}>i</span>
        s
      </h2>
      {isGameOver && <p className={tetrisStyle['game-over']}>Game over</p>}
      <div className={tetrisStyle.controlls}>
        {isShowStartBtn && <button className={tetrisStyle['game-btn']} onClick={startGame}>Start Game</button>}
        {isShowNewGameBtn && <button className={tetrisStyle['game-btn']} onClick={initBoard}>New Game</button>}
        <p className={tetrisStyle.score}>Score: {score}</p>
      </div>
      <div>
        <TetrisBoard board={board} /> 
      </div>
    </div>
  );
};
