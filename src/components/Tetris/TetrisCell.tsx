import React from 'react'
import { TetrisCellModel } from '../../models/tetris/TetrisCellModel'
import tetrisStyle from '../../styles/tetris.module.scss'
interface TetrisCellProps {
    cell: TetrisCellModel
}

export const TetrisCell = ({cell}: TetrisCellProps) => {
  return (
    <div className={tetrisStyle.cell}></div>
  )
}
