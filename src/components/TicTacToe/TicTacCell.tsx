import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react'
import { ticTacIcons } from '../../constants/tictactoe'
import { TicCell } from '../../models/ticTacToe/TicCell'

interface TicTacCellProps {
    cell: TicCell,
    clickOnCell: (cell: TicCell) => void
}


export const TicTacCell:FC<TicTacCellProps> = ({cell, clickOnCell}) => {
    
const clickHandler = () => {
    clickOnCell(cell)
}

  return (
    <div data-testid='tic-tac-cell' onClick={clickHandler} className='tictac-cell'>{cell.icon && <FontAwesomeIcon icon={ticTacIcons[cell.icon]} />}</div>
  )
}
