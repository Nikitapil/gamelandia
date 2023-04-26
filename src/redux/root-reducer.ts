import { combineReducers } from 'redux';
import { battleshipReducer } from './battleships/battleship-reducer';
import { snakeReducer } from './snake/snake-reducer';
import { scoreReducer } from './score/score-reducer';

export const rootReducer = combineReducers({
  battlship: battleshipReducer,
  snake: snakeReducer,
  score: scoreReducer
});

export type RootState = ReturnType<typeof rootReducer>;
