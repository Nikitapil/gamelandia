import { connectFirestoreEmulator } from 'firebase/firestore'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { InvadersBulletModel } from '../../models/cloneInvaders/InvadersBulletModel'
import { InvadersFieldModel } from '../../models/cloneInvaders/InvadersFieldModel'
import invadersStyles from '../../styles/invaders.module.scss'
import { InvadersBullet } from './InvadersBullet'
import { InvadersCell } from './InvadersCell'
import { InvadersGun } from './InvadersGun'

export const InvadersField = () => {
    const [board, setBoard] = useState(new InvadersFieldModel())
    const [bullet, setBullet] = useState<InvadersBulletModel | null>(null)
    const [bulletDestroyed, setBulletDestroyed] = useState(true)
    const bulletInterval = useRef<null | ReturnType<typeof setInterval>>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const move = () => {
        board.move()
        const newBoard = board.copyBoard()
        setBoard(newBoard)
    }

    const updateBoard = () => {
      const newBoard = board.copyBoard()
        setBoard(newBoard)
    }

    const onStartGame = () => {
        board.startGame()
        const newBoard = board.copyBoard()
        setBoard(newBoard)
        setInterval(() => move(), 500)
        if (containerRef.current) {
          containerRef.current.focus()
        }
    }

    const destroyBullet = () => {
          bullet?.destroy()
          setBulletDestroyed(true)
          setBullet(null)
          clearInterval(bulletInterval.current!)
          bulletInterval.current = null
    }


    const moveBullet = useCallback(() => {
      if (bullet?.isDestroyed) {
        destroyBullet()
        return
      }
      if (bullet) {
        bullet!.move()
        if (bullet.y === 400) {
          destroyBullet()
          return
        }
        const newBullet = bullet!.copyBullet()
        setBullet(newBullet)
      }
    }, [bulletDestroyed, bullet])



    const onGunMove = (e: React.KeyboardEvent) => {
        if (e.code === 'ArrowRight') {
          board.gun.toRight()
          const newBoard = board.copyBoard()
          setBoard(newBoard)
        }
        if (e.code === 'ArrowLeft') {
          board.gun.toLeft()
          const newBoard = board.copyBoard()
          setBoard(newBoard)
        }
        if (e.code === 'Space') {
          if (!bullet) {
            const bull = new InvadersBulletModel(board.gun.x + 15)
            setBulletDestroyed(false)
            setBullet(bull)
          }
        }
    }

    useEffect(() => {
      if (bullet && !bulletInterval.current && !bulletDestroyed) {
        bulletInterval.current = setInterval(() => moveBullet(), 20)
      } 
    }, [bullet, bulletInterval.current, bulletDestroyed])

  return (
    <div className={invadersStyles.invaders__field} onKeyDown={onGunMove} tabIndex={0} ref={containerRef}>
        {!board.isGameStarted && <button onClick={onStartGame}>Start</button>}
        { board.isGameStarted &&<div className={invadersStyles['invaders__field-cells']}>
            {
            board.cells.map(row => row.map(cell => <InvadersCell isBulletDestroyed={bulletDestroyed} bullet={bullet} destroyBullet={destroyBullet} cell={cell} key={cell.id} />))
            }
            {bullet && !bulletDestroyed && <InvadersBullet bullet={bullet} />}
            <InvadersGun gun={board.gun} />
        </div>}
    </div>
  )
}
