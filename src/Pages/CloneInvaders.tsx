import { Auth } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { InvadersField } from '../components/CloneInvaders/InvadersField';
import { CommonScoreBoard } from '../components/common/CommonScoreBoard';
import { breadcrumbs } from '../constants/breadcrumbs';
import { EGamesWithScoreBoard } from '../types/scoreTypes';
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import { useTitle } from '../hooks/useTitle';
import invadersStyles from '../styles/invaders.module.scss';

interface CloneInvadersProps {
  auth: Auth;
}

export const CloneInvaders = ({ auth }: CloneInvadersProps) => {
  useTitle('Clone Invaders');
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.cloneInvaders]);
  const game = EGamesWithScoreBoard.INVADERS;
  const [user] = useAuthState(auth);
  return (
    <div className={`container ${invadersStyles.invaders}`}>
      <h2 className="page-title">Clone invaders</h2>
      <div className={invadersStyles.boards}>
        <InvadersField user={user} />
        {user && <CommonScoreBoard user={user} game={game} />}
      </div>
    </div>
  );
};
