import React from 'react'
import { RoundLoader } from '../../UI/Loaders/RoundLoader'

export const ChessOnlineLoader = () => {
  return (
    <div className='chess-online__loader'>
        <h2 className='page-title'>Waiting for second player</h2>
        <RoundLoader/>
    </div>
  )
}
