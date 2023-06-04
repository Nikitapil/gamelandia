import { AxiosResponse } from 'axios';
import { IUpdateWinCountRequest, IWinCount } from './types';
import $api from '../api/api';
import { EGamesNames } from '../games/constants';

export class WinsCountService {
  static async updateWinCount(
    request: IUpdateWinCountRequest
  ): Promise<AxiosResponse<IWinCount[]>> {
    return $api.post<IWinCount[]>('games/win', request);
  }

  static async getWinCountByGameName(gameName: EGamesNames): Promise<AxiosResponse<IWinCount[]>> {
    return $api.get<IWinCount[]>(`games/win/${gameName}`);
  }
}
