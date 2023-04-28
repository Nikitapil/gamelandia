import { combineReducers } from 'redux';
import { snakeReducer } from './snake/snake-reducer';
import { scoreReducer } from './score/score-reducer';

export const rootReducer = combineReducers({
  snake: snakeReducer,
  score: scoreReducer
});

export type RootState = ReturnType<typeof rootReducer>;
