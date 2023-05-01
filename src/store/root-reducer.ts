import { combineReducers } from 'redux';
import { appReducer } from '../app/store/app.slice';
import { authReducer } from '../auth/store/auth.slice';
import { battleshipReducer } from '../games/battleship/store/battleship.slice';
import { scoreReducer } from '../score/store/score.slice';

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  battleship: battleshipReducer,
  score: scoreReducer
});