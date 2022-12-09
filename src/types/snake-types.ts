export interface ISnakeBestScore {
  [key: string]: number;
}

export enum ESnakeActions {
  SET_SNAKE_ALL_BEST_SCORES = 'SET_SNAKE_ALLBESTSCORES',
  SET_SNAKE_MY_BEST_SCORES = 'SET_SNAKE_MY_BEST_SCORES',
  FETCH_SNAKE_BEST_SCORE = 'FETCH_SNAKE_BEST_SCORE'
}

export interface ISnakeBestScores {
  easy: ISnakeBestScore;
  medium: ISnakeBestScore;
  hard: ISnakeBestScore;
  best: {
    easy: number;
    medium: number;
    hard: number;
  };
}

export interface ISnakeInitialState {
  allBestScores: ISnakeBestScore | null;
  myBestScores: ISnakeBestScore | null;
}

interface ISetSnakeAllBestScores {
  type: ESnakeActions.SET_SNAKE_ALL_BEST_SCORES;
  payload: ISnakeBestScore;
}

interface ISetSnakeMyBestScores {
  type: ESnakeActions.SET_SNAKE_MY_BEST_SCORES;
  payload: ISnakeBestScore;
}

export type SnakeActions = ISetSnakeAllBestScores | ISetSnakeMyBestScores;
