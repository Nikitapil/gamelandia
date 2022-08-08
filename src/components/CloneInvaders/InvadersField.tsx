import React, { useCallback, useEffect, useRef, useState } from 'react'
import { InvadersBulletModel } from '../../models/cloneInvaders/InvadersBulletModel'
import { InvadersFieldModel } from '../../models/cloneInvaders/InvadersFieldModel'
import invadersStyles from '../../styles/invaders.module.scss'
import { ModalContainer } from '../UI/ModalContainer'
import { InvadersBullet } from './InvadersBullet'
import { InvadersCell } from './InvadersCell'
import { InvadersGun } from './InvadersGun'

export const InvadersField = () => {
    const [board, setBoard] = useState(new InvadersFieldModel())
    const [bullet, setBullet] = useState<InvadersBulletModel | null>(null)
    const [gameOver, setGameOver] = useState(false)
    const [score, setScore] = useState(0)
    const bulletInterval = useRef<null | ReturnType<typeof setInterval>>(null)
    const gameInterval = useRef<null | ReturnType<typeof setInterval>>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const move = () => {
        board.move()
        const newBoard = board.copyBoard()
        setBoard(newBoard)
    }

    const onStartGame = () => {
        board.startGame()
        const newBoard = board.copyBoard()
        setBoard(newBoard)
        gameInterval.current = setInterval(() => move(), 250)
        if (containerRef.current) {
          containerRef.current.focus()
        }
    }

    const destroyBullet = () => {
          bullet?.destroy()
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
    }, [bullet, bullet?.isDestroyed])



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
            const bull = new InvadersBulletModel(board.gun.x +20)
            setBullet(bull)
          }
        }
    }

    useEffect(() => {
      if (bullet && !bulletInterval.current) {
        bulletInterval.current = setInterval(() => moveBullet(), 20)
      } 
    }, [bullet, bulletInterval.current])

    const increaseScore = () => setScore(prev => prev + 20)


    const onGameOver = () => {
      setGameOver(true)
      destroyBullet()
      setBoard(new InvadersFieldModel())
      clearInterval(gameInterval.current!)
    }

  return (
    <div className={invadersStyles.invaders__field} onKeyDown={onGunMove} tabIndex={0} ref={containerRef}>
        {!board.isGameStarted && <button onClick={onStartGame} className={invadersStyles.start}>Start</button>}
        { board.isGameStarted &&<div className={invadersStyles['invaders__field-cells']}>
          <p className={invadersStyles.score}>Score: {score}</p>
            {
            board.cells.map(row => row.map(cell => <InvadersCell gameOver={onGameOver} increaseScore={increaseScore} bullet={bullet} destroyBullet={destroyBullet} cell={cell} key={cell.id} />))
            }
            {bullet && <InvadersBullet bullet={bullet} />}
            <InvadersGun gun={board.gun} />
        </div>}
        {gameOver && <ModalContainer closeModal={() => setGameOver(false)}>
            You loose with score: {score}
        </ModalContainer>}
    </div>
  )
}
