import React from 'react';
import { InvadersField } from '../components/InvadersField';
import { breadcrumbs } from '../../../constants/breadcrumbs';
import { useBreadcrumbs } from '../../../app/hooks/useBreadcrumbs';
import { useTitle } from '../../../hooks/useTitle';
import styles from '../assets/styles/invaders.module.scss';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { authSelector } from '../../../store/selectors';
import { EGamesNames } from '../../constants';
import { GameWithScore } from '../../components/GameWithScore/GameWithScore';

export const CloneInvaders = () => {
  useTitle('Clone Invaders');
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.cloneInvaders]);
  const { user } = useAppSelector(authSelector);

  return (
    <div className={`container game-page-container ${styles.invaders}`}>
      <h2 className="page-title">Clone invaders</h2>
      <GameWithScore
        game={EGamesNames.CLONE_INVADERS}
        user={user}
      >
        <InvadersField />
      </GameWithScore>
    </div>
  );
};
