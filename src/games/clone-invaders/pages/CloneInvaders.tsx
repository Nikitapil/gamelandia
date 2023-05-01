import React from 'react';
import { InvadersField } from '../components/InvadersField';
import { breadcrumbs } from '../../../constants/breadcrumbs';
import { useBreadcrumbs } from '../../../hooks/useBreadcrumbs';
import { useTitle } from '../../../hooks/useTitle';
import invadersStyles from '../assets/styles/invaders.module.scss';
import { CommonScoreBoard } from '../../../score/components/CommonScoreBoard';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { authSelector } from '../../../store/selectors';
import { EGamesNames } from '../../../constants/games';

export const CloneInvaders = () => {
  useTitle('Clone Invaders');
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.cloneInvaders]);
  const { user } = useAppSelector(authSelector);
  return (
    <div className={`container ${invadersStyles.invaders}`}>
      <h2 className="page-title">Clone invaders</h2>
      <div className={invadersStyles.boards}>
        <InvadersField />
        <CommonScoreBoard user={user} game={EGamesNames.CLONE_INVADERS} />
      </div>
    </div>
  );
};
