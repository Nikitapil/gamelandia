import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EChessColors } from '../models/EChessColors';
import { Player } from '../models/Player';
import { ModalContainer } from '../../../components/UI/ModalContainer/ModalContainer';
import { TimerModal } from './TimerModal';
import { AppButton } from '../../../components/UI/AppButton/AppButton';
import { IChessTime } from '../helpers/types';
import { formatChessTime } from '../helpers/utils';
import styles from '../assets/styles/chess.module.scss';

interface ChessTimerProps {
  currentPlayer: Player | null;
  restart: () => void;
  endGame: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (bool: boolean) => void;
  setWinner: (color: EChessColors) => void;
}

export const ChessTimer = memo(
  ({ currentPlayer, restart, isModalOpen, setIsModalOpen, setWinner }: ChessTimerProps) => {
    const { t } = useTranslation();

    const [time, setTime] = useState<IChessTime>({
      black: 300,
      white: 300
    });

    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    const decrementTimer = useCallback(() => {
      const key = currentPlayer?.color || 'white';

      if (time[key] <= 0) {
        const winner = key === 'white' ? EChessColors.BLACK : EChessColors.WHITE;
        setWinner(winner);
        if (timer.current) {
          clearInterval(timer.current);
        }
        return;
      }

      setTime({ ...time, [key]: time[key] - 1 });
    }, [currentPlayer?.color, setWinner, time]);

    const startTimer = useCallback(() => {
      if (timer.current) {
        clearInterval(timer.current);
      }
      timer.current = setInterval(decrementTimer, 1000);
    }, [decrementTimer]);

    const handleRestart = (timeValue: number = 300) => {
      setTime({
        white: timeValue,
        black: timeValue
      });
      restart();
      setIsModalOpen(false);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    useEffect(() => {
      startTimer();
    }, [currentPlayer, startTimer]);

    return (
      <div>
        <AppButton
          onClick={() => setIsModalOpen(true)}
          customClass={styles.chess__restart}
          testId="chess__restart"
          type="button"
          fullWidth
        >
          {t('restart_game')}
        </AppButton>

        <div className={styles['chess-timer__time']}>
          <div className={styles['chess-timer__item']}>
            {t('black')} - <div className={styles.time}>{formatChessTime(time.black)}m</div>
          </div>
          <div className={styles['chess-timer__item']}>
            {t('white')} - <div className={styles.time}>{formatChessTime(time.white)}m</div>
          </div>
        </div>

        <ModalContainer
          isOpened={isModalOpen}
          closeModal={() => handleRestart(3600)}
          title={t('set_game_time')}
        >
          <TimerModal
            closeModal={closeModal}
            start={handleRestart}
          />
        </ModalContainer>
      </div>
    );
  }
);
