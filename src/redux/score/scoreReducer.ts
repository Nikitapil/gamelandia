import {
  EScoreActionsTypes,
  IScoreBoardInitialState,
  TScoreActions
} from '../../types/scoreTypes';

const initialState: IScoreBoardInitialState = {
  scores: [],
  isLoading: false
};

export const scoreReducer = (state = initialState, action: TScoreActions) => {
  switch (action.type) {
    case EScoreActionsTypes.SET_BOARD_SCORES:
      return { ...state, scores: action.payload };
    case EScoreActionsTypes.SET_SCORES_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return { ...state };
  }
};
