import React, { useEffect, useState } from 'react'
import { TicTacBoard } from '../components/TicTacToe/TicTacBoard'
import { TicBoard } from '../models/ticTacToe/TicBoard'
import '../styles/tictac.scss'
export const TicTacToe = () => {
    const [board, setBoard] = useState(new TicBoard())
    const [winner, setWinner] = useState('')
    const restart = () => {
      const newBoard = new TicBoard() 
      newBoard.initCells() 
      setBoard(newBoard)
      setWinner('')
    }

    useEffect(() => {
      restart()
    }, [])

  return (
    <div className='container tic-tac-container' data-testid='tic-tac-page'>
      <h1 className='tic-tac__title'>Tic Tac Toe</h1>
      <button className='tic-tac__restart' onClick={restart}>Restart</button>
        <TicTacBoard winner={winner} setWinner={setWinner}  setBoard={setBoard} board={board} />
    </div>
  )
}
