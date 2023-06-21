import { AxiosResponse } from 'axios';
import { IAuthResponse, IBaseAuthRequest, ISignUpAuthRequest } from './types';
import $api from '../api/api';

export class AuthService {
  static async signUp(userData: ISignUpAuthRequest): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/auth/signup', userData);
  }

  static async signIn(userData: IBaseAuthRequest): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/auth/signin', userData);
  }

  static async refresh(): Promise<AxiosResponse<IAuthResponse>> {
    return $api.get<IAuthResponse>('/auth/refresh');
  }

  static async logout(): Promise<AxiosResponse<IAuthResponse>> {
    return $api.get<IAuthResponse>('/auth/logout');
  }

  static async getRestoreKey(email: string): Promise<AxiosResponse> {
    return $api.post('/auth/get_restore_password_key', { email });
  }

  static async restorePassword(
    key: string,
    password: string
  ): Promise<AxiosResponse<IAuthResponse>> {
    return $api.put<IAuthResponse>('/auth/restore_password', { key, password });
  }
}
