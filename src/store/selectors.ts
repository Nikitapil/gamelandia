import { RootState } from './index';

export const appSelector = (state: RootState) => state.app;
export const authSelector = (state: RootState) => state.auth;
export const battleshipSelector = (state: RootState) => state.battleship;
export const scoreSelector = (state: RootState) => state.score;
export const winnersSelector = (state: RootState) => state.winners;
export const statisticsSelector = (state: RootState) => state.statistics;
