import React, { useEffect, useState } from 'react'
import { ChessBoardComponent } from '../components/Chess/ChessBoardComponent'
import { ChessTimer } from '../components/Chess/ChessTimer'
import { LostFigures } from '../components/Chess/LostFigures'
import { Board } from '../models/chess/Board'
import { Colors } from '../models/chess/Colors'
import { Player } from '../models/chess/Player'
import '../styles/chess.scss'
export const Chess = () => {
    const [board, setBoard] = useState(new Board())
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
    const restart = () => {
        const newBoard = new Board();
        newBoard.initCells()
        newBoard.addFigures()
        setBoard(newBoard)
        setCurrentPlayer(whitePlayer)
    }

    useEffect(() => {
        restart()
        setCurrentPlayer(whitePlayer)
    }, [])

   const swapPlayer = () => {
      setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer: whitePlayer)
    }

  return (
    <div className='chess container'>
      <div className='chess_timer'><ChessTimer currentPlayer={currentPlayer} restart={restart}/></div>
        <ChessBoardComponent board={board} setBoard={setBoard} currentPlayer={currentPlayer} swapPlayer ={swapPlayer}/>
        <div className='lost'>
          <LostFigures title='Black' figures={board.lostBlackFigures} />
          <LostFigures title='White' figures={board.lostWhightFigures} />
        </div>
    </div>
  )
}
