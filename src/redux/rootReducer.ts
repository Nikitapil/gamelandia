import { appReducer } from "./appStore/appReducer";
import { battleshipReducer } from "./battleships/battleshipReducer";
import { combineReducers } from "redux";
import { snakeReducer } from "./snake/snakeReducer";

export const rootReducer = combineReducers({
  battlship: battleshipReducer,
  app: appReducer,
  snake: snakeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
