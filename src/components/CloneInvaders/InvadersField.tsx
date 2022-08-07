import React, { useState } from 'react'
import { InvadersFieldModel } from '../../models/cloneInvaders/InvadersFieldModel'
import invadersStyles from '../../styles/invaders.module.scss'
import { InvadersCell } from './InvadersCell'
import { InvadersGun } from './InvadersGun'

export const InvadersField = () => {
    const [board, setBoard] = useState(new InvadersFieldModel())

    const move = () => {
        board.move()
        setBoard(board.copyBoard())
    }

    const onStartGame = () => {
        board.startGame()
        const newBoard = board.copyBoard()
        setBoard(newBoard)
        setInterval(() => move(), 500)
    }

    const onGunMove = (e: React.KeyboardEvent) => {
        console.log(e.code)
        if (e.code === 'ArrowRight') {
          console.log('right')
        }
    }

    

  return (
    <div className={invadersStyles.invaders__field} onKeyDown={onGunMove}>
        {!board.isGameStarted && <button onClick={onStartGame}>Start</button>}
        { board.isGameStarted &&<div className={invadersStyles['invaders__field-cells']}>
            {
            board.cells.map(row => row.map(cell => <InvadersCell cell={cell} key={cell.id} />))
            }
            <InvadersGun gun={board.gun} />
        </div>}
    </div>
  )
}
