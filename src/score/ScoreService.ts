import { AxiosResponse } from 'axios';
import { ICreateScoreRequest, IScoreResponse } from './types';
import $api from '../api/api';
import { EGamesNames } from '../games/constants';

export class ScoreService {
  static async createScore(request: ICreateScoreRequest): Promise<AxiosResponse<IScoreResponse>> {
    return $api.post<IScoreResponse>('/games/score', request);
  }

  static async getScore(gameName: EGamesNames): Promise<AxiosResponse<IScoreResponse>> {
    return $api.get<IScoreResponse>(`/games/score/${gameName}`);
  }
}
