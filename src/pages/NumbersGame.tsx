import React from 'react';
import { NumbersBoard } from '../components/2048/NumbersBoard';
import styles from '../styles/numbersGame.module.scss';
import { useTitle } from '../hooks/useTitle';
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import { breadcrumbs } from '../constants/breadcrumbs';
import { useAppSelector } from '../hooks/useAppSelector';
import { authSelector } from '../store/selectors';
import { CommonScoreBoard } from '../score/components/CommonScoreBoard';
import { EGamesNames } from '../constants/games';

export const NumbersGame = () => {
  useTitle('2048');
  useBreadcrumbs([breadcrumbs.main, breadcrumbs['2048']]);
  const { user } = useAppSelector(authSelector);
  return (
    <div className={`container ${styles.page}`}>
      <h1 className="page-title">2048 Game</h1>
      <div className={styles['numbers-boards']}>
        <NumbersBoard />
        <CommonScoreBoard user={user} game={EGamesNames.NUMBERS} />
      </div>
    </div>
  );
};
