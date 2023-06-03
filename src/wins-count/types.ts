import { EGamesLevels, EGamesNames } from '../games/constants';

export interface IUpdateWinCountRequest {
  gameName: EGamesNames;
  level?: EGamesLevels;
}

export interface IWinCount {
  id: number;
  createdAt: string;
  updatedAt: string;
  value: number;
  level: string;
  gameName: string;
  userId: number;
  User: {
    username: string;
  };
}

export interface IWinsSliceInterface {
  isWinnersLoading: boolean;
  winners: IWinCount[];
}
