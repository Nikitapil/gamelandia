import React, { useMemo } from 'react';
import styles from '../assets/styles/scores.module.scss';
import { IScore } from '../types';

interface IScoreProps {
  score: IScore;
  isMyScore: boolean;
}

export const Score = ({ score, isMyScore }: IScoreProps) => {
  const className = useMemo(() => {
    const myScoreClass = isMyScore ? styles['my-score'] : '';

    return `${styles['score-board_value']} ${myScoreClass}`;
  }, [isMyScore]);

  return (
    <p className={className}>
      <span>{score.User?.username || 'Unknown'}</span>
      <span>{score.value}</span>
    </p>
  );
};
