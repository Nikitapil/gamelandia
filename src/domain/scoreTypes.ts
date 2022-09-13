export interface IBoardScore {
  uid: string;
  name: string;
  score: number;
}

export enum EScoreActionsTypes {
  SET_BOARD_SCORES = 'SET_BOARD_SCORES',
  FETCH_BOARD_SCORES = 'FETCH_BOARD_SCORES'
}

export interface IScoreBoardInitialState {
  scores: IBoardScore[];
}

export interface IScoreSetScoresAction {
  type: EScoreActionsTypes.SET_BOARD_SCORES;
  payload: IBoardScore[];
}

export type TScoreActions = IScoreSetScoresAction;

export enum EGamesWithScoreBoard {
  INVADERS = 'invaders',
  TETRIS = 'tetris'
}
