import { ISnakeBestScore, ISnakeBestScores } from '../../types/snake-types';

export const snakeBestScoreMapper = (
  bestScores: ISnakeBestScores,
  uid: string
) => {
  const myBestScores: ISnakeBestScore = {
    easy: bestScores.easy?.[uid] || 0,
    medium: bestScores.medium?.[uid] || 0,
    hard: bestScores.hard?.[uid] || 0
  };
  const allBestScores: ISnakeBestScore = bestScores.best;

  return { myBestScores, allBestScores };
};
