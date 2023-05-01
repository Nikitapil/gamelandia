import { EGamesLevels, EGamesNames } from '../games/constants';

export interface ICreateScoreRequest {
  gameName: EGamesNames;
  value: number;
  level?: EGamesLevels;
}

export interface IScore {
  id: number;
  createdAt: string;
  value: number;
  level: EGamesLevels | null;
  gameName: string;
  userId: number | null;
  User: { username: string } | null;
}

export interface IScoreResponse {
  withLevels: boolean;
  scores: IScore[];
}

export interface IScoreSliceState {
  scores: IScore[];
  withLevels: boolean;
  isLoading: boolean;
}
