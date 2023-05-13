import React, { memo } from 'react';
import { BattleshipCell } from './BattleshipCell';
import styles from '../assets/styles/battleship.module.scss';
import { TBattleshipRoomData, TPlayerKey } from '../helpers/types';
import { BattleshipBoardModel } from '../models/BattleShipBoardModel';

interface IBattleshipBoardProps {
  roomData: TBattleshipRoomData;
  secondPlayer: TPlayerKey;
  board: BattleshipBoardModel;
}

export const BattleshipBoard = memo(
  ({ roomData, secondPlayer, board }: IBattleshipBoardProps) => {
    return (
      <div className={styles.battleship__board}>
        {board?.cells.map((row) =>
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
