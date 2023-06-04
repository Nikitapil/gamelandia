import { ReactNode } from 'react';
import { EGamesNames } from '../../constants';
import { IUser } from '../../../auth/types';
import styles from './game-with-score.module.scss';
import { CommonScoreBoard } from '../../../score/components/CommonScoreBoard';

interface IGameWithScoreProps {
  game: EGamesNames;
  user: IUser | null;
  children: ReactNode;
}

export const GameWithScore = ({ game, user, children }: IGameWithScoreProps) => {
  return (
    <div className={styles.boards}>
      <div>{children}</div>
      <CommonScoreBoard
        game={game}
        user={user}
      />
    </div>
  );
};
