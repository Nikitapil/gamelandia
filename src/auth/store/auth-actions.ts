import { IBaseAuthRequest, ISignUpAuthRequest } from '../types';
import { AppDispatch } from '../../store';
import { authSlice } from './auth.slice';
import { AuthService } from '../AuthService';
import { removeToken, setToken } from '../../utils/token-helpers';

export const signup = (userData: ISignUpAuthRequest) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.setIsAuthLoading(true));
      dispatch(authSlice.actions.setAuthError(''));
      const response = await AuthService.signUp(userData);
      const { user, accessToken } = response.data;
      setToken(accessToken);
      dispatch(authSlice.actions.setUser(user));
    } catch (e: any) {
      dispatch(authSlice.actions.setAuthError(e?.response?.data?.message));
    } finally {
      dispatch(authSlice.actions.setIsAuthLoading(false));
    }
  };
};

export const signin = (userData: IBaseAuthRequest) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.setIsAuthLoading(true));
      dispatch(authSlice.actions.setAuthError(''));
      const response = await AuthService.signIn(userData);
      const { user, accessToken } = response.data;
      setToken(accessToken);
      dispatch(authSlice.actions.setUser(user));
    } catch (e: any) {
      dispatch(authSlice.actions.setAuthError(e?.response?.data?.message));
    } finally {
      dispatch(authSlice.actions.setIsAuthLoading(false));
    }
  };
};

export const refresh = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.setIsAuthLoading(true));
      const response = await AuthService.refresh();
      const { user, accessToken } = response.data;
      setToken(accessToken);
      dispatch(authSlice.actions.setUser(user));
    } catch (e: any) {
      dispatch(authSlice.actions.setUser(null));
    } finally {
      dispatch(authSlice.actions.setIsAuthLoading(false));
    }
  };
};
export const logout = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.setIsAuthLoading(true));
      await AuthService.logout();
      removeToken();
      dispatch(authSlice.actions.setUser(null));
    } catch (e: any) {
      localStorage.removeItem('token');
      dispatch(authSlice.actions.setUser(null));
    } finally {
      dispatch(authSlice.actions.setIsAuthLoading(false));
    }
  };
};
