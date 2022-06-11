import React, { FC } from 'react'
import { SnakeBoardModel } from '../../models/snake/SnakeBoardModel'
import { SnakeCell } from './SnakeCell'

interface snakeBoardProps {
    board: SnakeBoardModel | null
}

export const SnakeBoard:FC<snakeBoardProps> = ({board}) => {
  return (
    <div className='snake-board'>
        {board?.cells.map(row => row.map(cell => <SnakeCell cell={cell} key={cell.id}/>))}
    </div>
  )
}
