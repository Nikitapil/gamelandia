import React, { FC } from 'react'
import { TicBoard } from '../../models/ticTacToe/TicBoard'
import { TicCell } from '../../models/ticTacToe/TicCell'
import { TicTacCell } from './TicTacCell'
import tictacStyles from '../../styles/tictac.module.scss'
import { useTranslation } from 'react-i18next'
interface TicTacBoardProps {
    board: TicBoard
    setBoard: (board: TicBoard) => void
    winner: string
    setWinner: (winner: string) => void
}

export const TicTacBoard:FC<TicTacBoardProps> = ({board, setBoard, winner, setWinner}) => {
    const {t} = useTranslation()
    const clickOnCell = (cell:TicCell) => {
      if (!cell.icon && !winner) {
        const newBoard = cell.click()
        setBoard(newBoard)
       const isWinner = board.checkWinner()
       if (isWinner) {
        setWinner(board.currentPlayer)
       }
      }
    }

  return (
    <div className='board-container'>
          {winner && <h2 data-testid='winner-text' className={tictacStyles.tictac__winner}>{t(winner)} {t('wins')}!!!</h2>}
      <div className={tictacStyles['tictac-board']}>
          {!!board.cells.length && board.cells.map(row => row.map(cell => <TicTacCell clickOnCell={clickOnCell} cell={cell} key={cell.id} />))}
      </div>
    </div>
  )
}
