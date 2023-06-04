import { useCallback } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { authSelector } from '../../store/selectors';
import { useWinnersActions } from './useWinnersActions';
import { IUpdateWinCountRequest } from '../types';

export const useUpdateWinsCount = () => {
  const { user } = useAppSelector(authSelector);
  const { updateWinCount } = useWinnersActions();

  return useCallback(
    async (gameData: IUpdateWinCountRequest) => {
      if (user) {
        await updateWinCount(gameData);
      }
    },
    [updateWinCount, user]
  );
};
