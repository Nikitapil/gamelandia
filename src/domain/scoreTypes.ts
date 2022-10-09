export interface IBoardScore {
  uid: string;
  name: string;
  score: number;
}

export enum EScoreActionsTypes {
  SET_BOARD_SCORES = 'SET_BOARD_SCORES',
  FETCH_BOARD_SCORES = 'FETCH_BOARD_SCORES',
  SET_SCORES_LOADING = 'SET_SCORES_LOADING'
}

export interface IScoreBoardInitialState {
  scores: IBoardScore[];
  isLoading: boolean;
}

export interface IScoreSetScoresAction {
  type: EScoreActionsTypes.SET_BOARD_SCORES;
  payload: IBoardScore[];
}

export interface IScoreSetLoadingAction {
  type: EScoreActionsTypes.SET_SCORES_LOADING;
  payload: boolean;
}

export type TScoreActions = IScoreSetScoresAction | IScoreSetLoadingAction;

export enum EGamesWithScoreBoard {
  INVADERS = 'invaders',
  TETRIS = 'tetris',
  FLAPPY = 'flappy'
}
