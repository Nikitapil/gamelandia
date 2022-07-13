import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/chess.scss'
export const ChessTypes = () => {
  return (
    <div className='chess-types'>
        <Link to='/chess/rooms' className='chessTypes__item'>Online</Link>
        <Link to='/chess/offline' className='chessTypes__item'>Offline</Link>
    </div>
  )
}
