import React from 'react';
import { useDispatch } from 'react-redux';
import flappyStyles from '../styles/flappy.module.scss';
import { FlappyField } from '../components/flappy/FlappyField';
import { useTitle } from '../hooks/useTitle';
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import { breadcrumbs } from '../constants/breadcrumbs';
import { EGamesWithScoreBoard } from '../types/score-types';
import { ScoreService } from '../services/ScoreService';
import { fetchBoardScores } from '../redux/score/score-actions';

export const FlappyBird = () => {
  useTitle('Flappy Bird');
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.flappy]);
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
        {/* TODO fix score with new backend */}
        {/* {user && ( */}
        {/*  <CommonScoreBoard user={user} game={EGamesWithScoreBoard.FLAPPY} /> */}
        {/* )} */}
      </div>
    </div>
  );
};
