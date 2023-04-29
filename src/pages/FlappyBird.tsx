import React from 'react';
import flappyStyles from '../styles/flappy.module.scss';
import { FlappyField } from '../components/flappy/FlappyField';
import { useTitle } from '../hooks/useTitle';
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import { breadcrumbs } from '../constants/breadcrumbs';
import { useAppSelector } from '../hooks/store/useAppSelector';
import { authSelector } from '../store/selectors';
import { EGamesNames } from '../constants/games';
import { CommonScoreBoard } from '../score/components/CommonScoreBoard';
import { useCreateScore } from '../hooks/useCreateScore';

export const FlappyBird = () => {
  useTitle('Flappy Bird');
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.flappy]);
  const { user } = useAppSelector(authSelector);
  const createScore = useCreateScore();

  const updateScores = async (score: number) => {
    await createScore({
      value: score,
      gameName: EGamesNames.FLAPPY
    });
  };

  return (
    <div className={`container ${flappyStyles['flappy-container']}`}>
      <h2 className="page-title">FlappyBird</h2>
      <div className={flappyStyles['flappy-boards']}>
        <FlappyField onUpdateScore={updateScores} />
        <CommonScoreBoard user={user} game={EGamesNames.FLAPPY} />
      </div>
    </div>
  );
};
