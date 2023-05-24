import React from 'react';
import styles from '../assets/styles/flappy.module.scss';
import { FlappyField } from '../components/FlappyField';
import { useTitle } from '../../../hooks/useTitle';
import { useBreadcrumbs } from '../../../app/hooks/useBreadcrumbs';
import { breadcrumbs } from '../../../constants/breadcrumbs';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { authSelector } from '../../../store/selectors';
import { useCreateScore } from '../../../score/hooks/useCreateScore';
import { EGamesNames } from '../../constants';
import { GameWithScore } from '../../components/GameWithScore/GameWithScore';

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
    <div className={`container ${styles['flappy-container']}`}>
      <h2 className="page-title">FlappyBird</h2>
      <GameWithScore
        game={EGamesNames.FLAPPY}
        user={user}
      >
        <FlappyField onUpdateScore={updateScores} />
      </GameWithScore>
    </div>
  );
};
