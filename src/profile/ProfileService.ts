import { AxiosResponse } from 'axios';
import { IEditUserRequest, IGameStatistics } from './types';
import $api from '../api/api';
import { IUser } from '../auth/types';

export class ProfileService {
  static async editUser(editUserRequest: IEditUserRequest): Promise<AxiosResponse<IUser>> {
    return $api.put<IUser>('/users/edit', editUserRequest);
  }

  static async getGamesStatistics(): Promise<AxiosResponse<IGameStatistics[]>> {
    return $api.get<IGameStatistics[]>('/games/my_statistics');
  }

  static async deleteProfile(id: number) {
    return $api.delete(`/users/delete/${id}`);
  }
}
