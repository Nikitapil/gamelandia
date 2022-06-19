import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { BattleshipCellModel } from '../../models/battleship/BattleShipCellModel'
import { setBattleShipBoard, setCurrentFreeShip, setFreeShips } from '../../redux/battleships/battleshipActions'
import { battleShipSelector } from '../../redux/battleships/battleshipSelectors'

interface BattleshipCellProps {
  cell: BattleshipCellModel
}

export const BattleshipCell:FC<BattleshipCellProps> = ({cell}) => {
    const {currentFreeShip, board} = useTypedSelector(battleShipSelector)
    const dispatch = useDispatch()
    const onMouseOver = () => {
      if (currentFreeShip && cell.isEmpty) {
        const isAddVailable = board?.checkIsAddAvailable(cell, currentFreeShip)
        if(isAddVailable) {
          board?.highlightCells(cell, currentFreeShip)
        }
        dispatch(setBattleShipBoard(board))
      }
    }

    const onClick = () => {
      if(currentFreeShip && cell.isAddAvailable) {
        board?.addShipOnBoard(cell, currentFreeShip)
        dispatch(setBattleShipBoard(board))
        dispatch(setFreeShips(board?.freeElems!))
        dispatch(setCurrentFreeShip(null))
      }
    }

  return (
    <div className={`battleship__cell ${cell.isAddAvailable ? 'battship-highlighted' : ''} ${cell.elem ? 'with-ship': ''}`} onMouseOver={onMouseOver} onClick={onClick}></div>
  )
}
