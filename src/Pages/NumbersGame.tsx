import React from 'react';
import { Auth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NumbersBoard } from '../components/2048/NumbersBoard';
import styles from '../styles/numbersGame.module.scss';
import { useTitle } from '../hooks/useTitle';
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import { breadcrumbs } from '../constants/breadcrumbs';
import { EGamesWithScoreBoard } from '../types/score-types';
import { CommonScoreBoard } from '../components/common/CommonScoreBoard';

interface NumbersGameProps {
  auth: Auth;
}

export const NumbersGame = ({ auth }: NumbersGameProps) => {
  useTitle('2048');
  useBreadcrumbs([breadcrumbs.main, breadcrumbs['2048']]);
  const [user] = useAuthState(auth);
  const game = EGamesWithScoreBoard.NUMBERS;
  return (
    <div className={`container ${styles.page}`}>
      <h1 className="page-title">2048 Game</h1>
      <div className={styles['numbers-boards']}>
        <NumbersBoard />
        {user && <CommonScoreBoard user={user} game={game} />}
      </div>
    </div>
  );
};
