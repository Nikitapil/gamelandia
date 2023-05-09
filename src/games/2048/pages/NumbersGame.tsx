import React from 'react';
import { NumbersBoard } from '../components/NumbersBoard';
import styles from '../assets/styles/numbers.module.scss';
import { useTitle } from '../../../hooks/useTitle';
import { useBreadcrumbs } from '../../../app/hooks/useBreadcrumbs';
import { breadcrumbs } from '../../../constants/breadcrumbs';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { authSelector } from '../../../store/selectors';
import { EGamesNames } from '../../constants';
import { GameWithScore } from '../../components/GameWithScore/GameWithScore';

export const NumbersGame = () => {
  useTitle('2048');
  useBreadcrumbs([breadcrumbs.main, breadcrumbs['2048']]);
  const { user } = useAppSelector(authSelector);

  return (
    <div className={`container ${styles.page}`}>
      <h1 className="page-title">2048 Game</h1>
      <GameWithScore game={EGamesNames.NUMBERS} user={user}>
        <NumbersBoard />
      </GameWithScore>
    </div>
  );
};
