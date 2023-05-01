import { toast } from 'react-toastify';
import { ICreateScoreRequest } from '../types';
import { AppDispatch } from '../../store';
import { scoreSlice } from './score.slice';
import { ScoreService } from '../ScoreService';
import { EGamesNames } from '../../games/constants';

export const createScore = (scoreData: ICreateScoreRequest) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(scoreSlice.actions.setIsLoading(true));
      const response = await ScoreService.createScore(scoreData);
      dispatch(scoreSlice.actions.setScores(response.data.scores));
      dispatch(scoreSlice.actions.setWithLevels(response.data.withLevels));
    } catch (e: any) {
      toast(e?.response?.data);
    } finally {
      dispatch(scoreSlice.actions.setIsLoading(false));
    }
  };
};

export const getScore = (gameName: EGamesNames) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(scoreSlice.actions.setIsLoading(true));
      const response = await ScoreService.getScore(gameName);
      dispatch(scoreSlice.actions.setScores(response.data.scores));
      dispatch(scoreSlice.actions.setWithLevels(response.data.withLevels));
    } catch (e: any) {
      toast(e?.response?.data);
    } finally {
      dispatch(scoreSlice.actions.setIsLoading(false));
    }
  };
};
