import { useCallback } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { authSelector } from '../../store/selectors';
import { useScoreActions } from './useScoreActions';
import { ICreateScoreRequest } from '../types';

export const useCreateScore = () => {
  const { user } = useAppSelector(authSelector);
  const { createScore } = useScoreActions();

  return useCallback(
    async (scoreData: ICreateScoreRequest) => {
      if (user) {
        await createScore(scoreData);
      }
    },
    [createScore, user]
  );
};
