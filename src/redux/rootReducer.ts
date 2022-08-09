import { appReducer } from "./appStore/appReducer";
import { battleshipReducer } from "./battleships/battleshipReducer";
import { combineReducers } from "redux";
import { snakeReducer } from "./snake/snakeReducer";
import { invadersReducer } from "./invaders/invadersReducer";

export const rootReducer = combineReducers({
  battlship: battleshipReducer,
  app: appReducer,
  snake: snakeReducer,
  invaders: invadersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
