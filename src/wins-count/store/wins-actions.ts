import { toast } from 'react-toastify';
import { IUpdateWinCountRequest } from '../types';
import { AppDispatch } from '../../store';
import { winsSlice } from './wins.slice';
import { WinsCountService } from '../WinsCountService';
import { EGamesNames } from '../../games/constants';

export const updateWinCount = (request: IUpdateWinCountRequest) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(winsSlice.actions.setIsWinnersLoading(true));
      const winnersData = await WinsCountService.updateWinCount(request);
      dispatch(winsSlice.actions.setWinners(winnersData.data));
    } catch (e: any) {
      toast(e?.response?.data);
    } finally {
      dispatch(winsSlice.actions.setIsWinnersLoading(false));
    }
  };
};

export const getWinners = (gameName: EGamesNames) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(winsSlice.actions.setIsWinnersLoading(true));
      const winnersData = await WinsCountService.getWinCountByGameName(gameName);
      dispatch(winsSlice.actions.setWinners(winnersData.data));
    } catch (e: any) {
      toast(e?.response?.data);
    } finally {
      dispatch(winsSlice.actions.setIsWinnersLoading(false));
    }
  };
};
