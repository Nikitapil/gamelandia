import { AxiosResponse } from 'axios';
import { IEditUserRequest } from './types';
import $api from '../api/api';
import { IUser } from '../auth/types';

export class ProfileService {
  static async editUser(editUserRequest: IEditUserRequest): Promise<AxiosResponse<IUser>> {
    return $api.put<IUser>('/users/edit', editUserRequest);
  }
}
