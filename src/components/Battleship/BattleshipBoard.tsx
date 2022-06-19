import React, { FC } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { BattleshipBoardModel } from '../../models/battleship/BattleShipBoardModel'
import { battleShipSelector } from '../../redux/battleships/battleshipSelectors'
import { BattleshipCell } from './BattleshipCell'


export const BattleshipBoard:FC = () => {
    const {board} = useTypedSelector(battleShipSelector)

  return (
    <div className='battleship__board'>
        {board?.cells.map(row => row.map(cell => <BattleshipCell cell={cell} key={cell.id} />))}
    </div>
  )
}
