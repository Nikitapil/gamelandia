import { appReducer } from "./appStore/appReducer";
import { battleshipReducer } from "./battleships/battleshipReducer";
import { combineReducers } from "redux";
import { snakeReducer } from "./snake/snakeReducer";
import { scoreReducer } from "./score/scoreReducer";

export const rootReducer = combineReducers({
  battlship: battleshipReducer,
  app: appReducer,
  snake: snakeReducer,
  score: scoreReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
