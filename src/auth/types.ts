export interface IUser {
  id: number;
  username: string;
  email: string;
}

export interface IAuthSliceState {
  user: IUser | null;
  isAuthLoading: boolean;
  authError: string;
}

export interface IBaseAuthRequest {
  email: string;
  password: string;
}

export interface ISignUpAuthRequest extends IBaseAuthRequest {
  username: string;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
}
