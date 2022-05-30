import React, { FC, useEffect, useRef, useState } from 'react'
import { Colors } from '../../models/chess/Colors'
import { Player } from '../../models/chess/Player'
import { ModalContainer } from '../UI/ModalContainer'
import { TimerModal } from './TimerModal'

interface ChessTimerProps {
    currentPlayer: Player | null
    restart: () => void
}

export const ChessTimer:FC<ChessTimerProps> = ({currentPlayer, restart}) => {
    const [blackTime, setBlackTime] = useState(300)
    const [whiteTime, setWhiteTime] = useState(300)
    const [isModalOpen, setIsModalOpen] = useState(true)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)
    const startTimer = () => {
        if (timer.current) {
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }

    const decrementBlackTimer = () => {
        
        setBlackTime(prev => prev-1)
    }

    const decrementWhiteTimer = () => {

        setWhiteTime(prev => prev-1)
    }

    useEffect(() => {
        startTimer()
    }, [currentPlayer])

    const handleRestart = (time = 300) => {
        setBlackTime(time)
        setWhiteTime(time)
        restart()
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

  return (
    <div>
        <button onClick={() => setIsModalOpen(true)} className='chess__restart'>Restart game</button>
        <div className='chess-timer__time'>
            <div className='chess-timer__item'>Black - <div className='time'>{(blackTime/60).toFixed(0)}m</div></div>
           <div className='chess-timer__item'> White - <div className='time'>{(whiteTime/60).toFixed(0)}m</div></div>
        </div>
        {isModalOpen && <ModalContainer closeModal={closeModal} title='Set time of the Game'><TimerModal closeModal={closeModal} start={handleRestart}/></ModalContainer>}
    </div>
  )
}
