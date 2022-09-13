import {
  ESnakeActions,
  ISnakeInitialState,
  SnakeActions
} from '../../domain/snakeTypes';

const initialState: ISnakeInitialState = {
  allBestScores: null,
  myBestScores: null
};
export const snakeReducer = (state = initialState, action: SnakeActions) => {
  switch (action.type) {
    case ESnakeActions.SET_SNAKE_ALL_BEST_SCORES:
      return { ...state, allBestScores: action.payload };
    case ESnakeActions.SET_SNAKE_MY_BEST_SCORES:
      return { ...state, myBestScores: action.payload };
    default:
      return { ...state };
  }
};
