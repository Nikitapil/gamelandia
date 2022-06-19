import { appReducer } from './appStore/appReducer';
import { battleshipReducer } from './battleships/battleshipReducer';
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    battlship: battleshipReducer,
    app: appReducer
})

export type RootState = ReturnType<typeof rootReducer>