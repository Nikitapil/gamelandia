import React, { memo, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { IChessTime } from '../../helpers/types';
import { Player } from '../../models/Player';
import { formatChessTime } from '../../helpers/utils';
import styles from '../../assets/styles/chess.module.scss';

interface ChessOnlineTimerProps {
  time: IChessTime;
  setTime: (time: IChessTime) => void;
  currentPlayer: Player | null;
  endGame: () => void;
}

export const ChessOnlineTimer = memo(
  ({ time, currentPlayer, endGame, setTime }: ChessOnlineTimerProps) => {
    const { t } = useTranslation();

    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    const decrementTimer = useCallback(() => {
      const key = currentPlayer?.color || 'white';
      if (time[key] <= 0) {
        endGame();
        if (timer.current) {
          clearInterval(timer.current);
        }
      }
      setTime({ ...time, [key]: time[key] - 1 });
    }, [currentPlayer?.color, endGame, setTime, time]);

    const startTimer = useCallback(() => {
      if (timer.current) {
        clearInterval(timer.current);
      }
      timer.current = setInterval(decrementTimer, 1000);
    }, [decrementTimer]);

    useEffect(() => {
      startTimer();
    }, [currentPlayer, startTimer, time]);

    return (
      <div>
        <div className={styles['chess-timer__time']}>
          <div className={styles['chess-timer__item']}>
            {t('black')} - <div className={styles.time}>{formatChessTime(time.black)}m</div>
          </div>
          <div className={styles['chess-timer__item']}>
            {t('white')} - <div className={styles.time}>{formatChessTime(time.white)}m</div>
          </div>
        </div>
      </div>
    );
  }
);
