import { ESnakeActions, ISnakeBestScore } from '../../domain/snakeTypes';

export const SetAllSnakeBestScores = (payload: ISnakeBestScore) => {
  return {
    type: ESnakeActions.SET_SNAKE_ALL_BEST_SCORES,
    payload
  };
};
export const SetSnakeMyBestScores = (payload: ISnakeBestScore) => {
  return {
    type: ESnakeActions.SET_SNAKE_MY_BEST_SCORES,
    payload
  };
};

export const fetchSnakeBestScoore = () => {
  return {
    type: ESnakeActions.FETCH_SNAKE_BEST_SCORE
  };
};
