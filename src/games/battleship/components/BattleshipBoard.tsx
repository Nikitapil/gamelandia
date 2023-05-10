import React, { memo, useMemo } from 'react';
import { BattleshipCell } from './BattleshipCell';
import styles from '../assets/styles/battleship.module.scss';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { battleshipSelector } from '../../../store/selectors';
import { TBattleshipRoomData, TPlayerKey } from '../helpers/types';

interface BattleshipBoardProps {
  isEnemy: boolean;
  roomData: TBattleshipRoomData;
  secondPlayer: TPlayerKey;
}

export const BattleshipBoard = memo(
  ({ isEnemy, roomData, secondPlayer }: BattleshipBoardProps) => {
    const { board, enemyBoard } = useAppSelector(battleshipSelector);

    const thisBoard = useMemo(() => {
      return isEnemy ? enemyBoard : board;
    }, [isEnemy, board, enemyBoard]);

    return (
      <div className={styles.battleship__board}>
        {thisBoard?.cells.map((row) =>
          row.map((cell) => (
            <BattleshipCell
              secondPlayer={secondPlayer}
              roomData={roomData}
              cell={cell}
              key={cell.id}
            />
          ))
        )}
      </div>
    );
  }
);
