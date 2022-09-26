import React from 'react';
import { Auth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';
import flappyStyles from '../styles/flappy.module.scss';
import { FlappyField } from '../components/flappy/FlappyField';
import { useTitle } from '../hooks/useTitle';
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import { breadcrumbs } from '../constants/breadcrumbs';
import { CommonScoreBoard } from '../components/common/CommonScoreBoard';
import { EGamesWithScoreBoard } from '../domain/scoreTypes';
import { ScoreService } from '../services/scoreService';
import { fetchBoardScores } from '../redux/score/scoreActions';

interface FlappyBirdProps {
  auth: Auth;
}

export const FlappyBird = ({ auth }: FlappyBirdProps) => {
  useTitle('Flappy Bird');
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.flappy]);
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  const updateScores = async (score: number) => {
    await ScoreService.setRecord(score, EGamesWithScoreBoard.FLAPPY);
    dispatch(fetchBoardScores(EGamesWithScoreBoard.FLAPPY));
  };

  return (
    <div className={`container ${flappyStyles['flappy-container']}`}>
      <h2 className="page-title">FlappyBird</h2>
      <div className={flappyStyles['flappy-boards']}>
        <FlappyField onUpdateScore={updateScores} />
        {user && (
          <CommonScoreBoard user={user} game={EGamesWithScoreBoard.FLAPPY} />
        )}
      </div>
    </div>
  );
};
