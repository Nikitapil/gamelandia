import { toast } from 'react-toastify';
import { IEditUserRequest } from '../types';
import { AppDispatch } from '../../store';
import { authSlice } from '../../auth/store/auth.slice';
import { ProfileService } from '../ProfileService';
import { statisticsSlice } from './statistics.slice';
import { removeToken } from '../../utils/token-helpers';

export const editUser = (editUserRequest: IEditUserRequest) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.setIsAuthLoading(true));
      const { data } = await ProfileService.editUser(editUserRequest);
      dispatch(authSlice.actions.setUser(data));
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error while editing user');
    } finally {
      dispatch(authSlice.actions.setIsAuthLoading(false));
    }
  };
};

export const getGameStatistics = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(statisticsSlice.actions.setIsLoading(true));
      const { data } = await ProfileService.getGamesStatistics();
      const filteredData = data.filter((game) => !!game.score || !!game.winsCount);
      dispatch(statisticsSlice.actions.setGameStatistics(filteredData));
    } catch (e) {
      toast.error('Error while getting statistics');
    } finally {
      dispatch(statisticsSlice.actions.setIsLoading(false));
    }
  };
};

export const deleteProfile = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.setIsAuthLoading(true));
      await ProfileService.deleteProfile(id);
      removeToken();
      dispatch(authSlice.actions.setUser(null));
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error while deleting profile');
    } finally {
      dispatch(authSlice.actions.setIsAuthLoading(false));
    }
  };
};
