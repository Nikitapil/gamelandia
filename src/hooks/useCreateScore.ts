import { useCallback } from 'react';
import { useAppSelector } from './store/useAppSelector';
import { authSelector } from '../store/selectors';
import { useScoreActions } from '../score/hooks/useScoreActions';
import { ICreateScoreRequest } from '../score/types';

export const useCreateScore = () => {
  const user = useAppSelector(authSelector);
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
