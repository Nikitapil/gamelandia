import React, { FC } from 'react'
import { Cell } from '../../models/chess/Cell'

interface ChessCellComponentsProps {
    cell:Cell
    selected: boolean
    click: (cell:Cell) => void
}

export const ChessCellComponents:FC<ChessCellComponentsProps> = ({cell, selected, click}) => {
  return (
    <div data-testid='chess-cell' className={`cell ${cell.color} ${selected ? 'selected' : ''} ${cell.figure && cell.available ? 'attack-available' : ''}`} onClick={() => click(cell)}>
        {!cell.figure && cell.available && <div data-testid='available-dot' className='available'></div>}
        {cell.figure?.logo && <img data-testid='figure-logo' src={cell.figure?.logo} alt={cell.figure?.name}/>}
    </div>
  )
}
