import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react'
import { ticTacIcons } from '../../constants/tictactoe'
import { TicCell } from '../../models/ticTacToe/TicCell'
import tictacStyles from '../../styles/tictac.module.scss'
interface TicTacCellProps {
    cell: TicCell,
    clickOnCell: (cell: TicCell) => void
}


export const TicTacCell:FC<TicTacCellProps> = ({cell, clickOnCell}) => {
    
const clickHandler = () => {
    clickOnCell(cell)
}

  return (
    <div data-testid='tic-tac-cell' onClick={clickHandler} className={tictacStyles['tictac-cell']}>{cell.icon && <FontAwesomeIcon icon={ticTacIcons[cell.icon]} />}</div>
  )
}
