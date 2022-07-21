import React, { FC, memo } from 'react'
import { SnakeBoardModel } from '../../models/snake/SnakeBoardModel'
import { SnakeCell } from './SnakeCell'
import snakeStyle from '../../styles/snake.module.scss'
interface snakeBoardProps {
    board: SnakeBoardModel | null
}

export const SnakeBoard:FC<snakeBoardProps> = memo(({board}) => {
  return (
    <div className={snakeStyle['snake-board']} data-testid='snake-board'>
        {board?.cells.map(row => row.map(cell => <SnakeCell cell={cell} key={cell.id}/>))}
    </div>
  )
})
