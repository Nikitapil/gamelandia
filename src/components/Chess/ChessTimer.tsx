import React, { memo, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../models/chess/Colors';
import { Player } from '../../models/chess/Player';
import { ModalContainer } from '../UI/ModalContainer';
import { TimerModal } from './TimerModal';
import { AppButton } from '../UI/AppButton';

interface ChessTimerProps {
  currentPlayer: Player | null;
  restart: () => void;
  endGame: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (bool: boolean) => void;
  setWinner: (color: Colors) => void;
}

export const ChessTimer = memo(
  ({
    currentPlayer,
    restart,
    isModalOpen,
    setIsModalOpen,
    setWinner
  }: ChessTimerProps) => {
    const [blackTime, setBlackTime] = useState(300);
    const [whiteTime, setWhiteTime] = useState(300);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);
    const { t } = useTranslation();

    const decrementBlackTimer = () => {
      if (blackTime <= 0) {
        setWinner(Colors.WHITE);
        clearInterval(timer.current!);
      }
      setBlackTime((prev) => prev - 1);
    };

    const decrementWhiteTimer = () => {
      if (whiteTime <= 0) {
        setWinner(Colors.BLACK);
        clearInterval(timer.current!);
      }
      setWhiteTime((prev) => prev - 1);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const startTimer = () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
      const callback =
        currentPlayer?.color === Colors.WHITE
          ? decrementWhiteTimer
          : decrementBlackTimer;
      timer.current = setInterval(callback, 1000);
    };

    useEffect(() => {
      startTimer();
    }, [currentPlayer, startTimer]);

    useEffect(() => {
      if (whiteTime <= 0) {
        if (timer.current) {
          clearInterval(timer.current);
        }
        setWinner(Colors.BLACK);
      }
      if (blackTime <= 0) {
        if (timer.current) {
          clearInterval(timer.current);
        }
        setWinner(Colors.WHITE);
      }
    }, [whiteTime, blackTime, setWinner]);

    const handleRestart = (time: number = 300) => {
      setBlackTime(time);
      setWhiteTime(time);
      restart();
      setIsModalOpen(false);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    return (
      <div>
        <AppButton
          onClick={() => setIsModalOpen(true)}
          customClass="chess__restart"
          testId="chess__restart"
          type="button"
          fullWidth
        >
          {t('restart_game')}
        </AppButton>
        <div className="chess-timer__time">
          <div className="chess-timer__item">
            {t('black')} -{' '}
            <div className="time">{(blackTime / 60).toFixed(0)}m</div>
          </div>
          <div className="chess-timer__item">
            {' '}
            {t('white')} -{' '}
            <div className="time">{(whiteTime / 60).toFixed(0)}m</div>
          </div>
        </div>
        {isModalOpen && (
          <ModalContainer
            closeModal={() => handleRestart(3600)}
            title={t('set_game_time')}
          >
            <TimerModal closeModal={closeModal} start={handleRestart} />
          </ModalContainer>
        )}
      </div>
    );
  }
);
