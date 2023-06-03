import React, { useMemo } from 'react';
import { IWinCount } from '../types';
import styles from '../assets/styles/winners.module.scss';

interface IWinnerProps {
  winner: IWinCount;
  isMe: boolean;
}

export const Winner = ({ winner, isMe }: IWinnerProps) => {
  const className = useMemo(() => {
    if (isMe) {
      return `${styles.winner} ${styles.my}`;
    }
    return styles.winner;
  }, [isMe]);

  return (
    <div className={className}>
      <p>{winner.User.username}</p>
      <p>{winner.value}</p>
    </div>
  );
};
