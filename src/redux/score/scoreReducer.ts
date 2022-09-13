import {
  EScoreActionsTypes,
  IScoreBoardInitialState,
  TScoreActions
} from '../../domain/scoreTypes';

const initialState: IScoreBoardInitialState = {
  scores: []
};

export const scoreReducer = (state = initialState, action: TScoreActions) => {
  switch (action.type) {
    case EScoreActionsTypes.SET_BOARD_SCORES:
      return { ...state, scores: action.payload };
    default:
      return { ...state };
  }
};
