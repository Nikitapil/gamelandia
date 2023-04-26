import { combineReducers } from 'redux';
import { appReducer } from './app/app.slice';
import { authReducer } from '../auth/store/auth.slice';

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer
});
