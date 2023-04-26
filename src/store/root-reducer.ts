import { combineReducers } from 'redux';
import { appReducer } from './app/app.slice';

export const rootReducer = combineReducers({
  app: appReducer
});
