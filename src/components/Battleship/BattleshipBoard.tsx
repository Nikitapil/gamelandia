import { Firestore } from 'firebase/firestore';
import React, { memo, useMemo } from 'react';
import { BattleshipCell } from './BattleshipCell';
import battlShipStyles from '../../styles/battleship.module.scss';
import { useAppSelector } from '../../hooks/useAppSelector';
import { battleshipSelector } from '../../store/selectors';

interface BattleshipBoardProps {
  isEnemy: boolean;
  roomData: any;
  secondPlayer: string;
  firestore: Firestore;
}

export const BattleshipBoard = memo(
  ({ isEnemy, roomData, secondPlayer, firestore }: BattleshipBoardProps) => {
    const { board, enemyBoard } = useAppSelector(battleshipSelector);

    const thisBoard = useMemo(() => {
      return isEnemy ? enemyBoard : board;
    }, [isEnemy, board, enemyBoard]);

    return (
      <div className={battlShipStyles.battleship__board}>
        {thisBoard?.cells.map((row) =>
          row.map((cell) => (
            <BattleshipCell
              firestore={firestore}
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
