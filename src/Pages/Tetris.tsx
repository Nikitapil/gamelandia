import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { TetrisBoard } from "../components/Tetris/TetrisBoard";
import { TetrisBoardModel } from "../models/tetris/TetrisBoardModel";
import tetrisStyle from '../styles/tetris.module.scss'
export const Tetris = () => {
    const [board, setBoard] = useState(new TetrisBoardModel())
    const figureInterval = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        const newBoard = new TetrisBoardModel()
        newBoard.initCells()
        setBoard(newBoard)
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

    const startMoving = () => {
      if (figureInterval.current) {
        clearInterval(figureInterval.current)
      }
      board.startGame()
      const newBoard = board.copyBoard()
      setBoard(newBoard)
      figureInterval.current = setInterval(() => {
        const move = board.currentFigure?.moveDown()
        if (!move) {
          board.clearRows()
          const newBoard = board.copyBoard()
          setBoard(newBoard)
          startMoving()
        }
        const newBoard = board.copyBoard()
      setBoard(newBoard)
      }, 1000)
    }

    const startGame = () => {
      startMoving()
    }

    

    


  return (
    <div className={`container ${tetrisStyle['tetris-container']}`} onKeyDown={onKeyPress}>
      <h2 className={`page-title ${tetrisStyle.title}`}>
        <span className={tetrisStyle['color-blue']}>T</span>
        <span className={tetrisStyle['color-green']}>e</span>
        <span className={tetrisStyle['color-yellow']}>t</span>
        <span className={tetrisStyle['color-orange']}>r</span>
        <span className={tetrisStyle['color-red']}>i</span>
        s
      </h2>
      <button onClick={startGame}>Start Game</button>
      <div>
        <TetrisBoard board={board} /> 
      </div>
    </div>
  );
};
