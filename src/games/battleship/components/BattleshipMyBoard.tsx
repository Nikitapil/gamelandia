import React from 'react';
import styles from '../assets/styles/battleship.module.scss';
import { BattleshipBoard } from './BattleshipBoard';
import { BattleshipElems } from './BattleshipElems';
import { BattleshipBoardModel } from '../models/BattleShipBoardModel';
import { TBattleshipRoomData, TPlayerKey } from '../helpers/types';

interface IBattleshipMyBoardProps {
  board: BattleshipBoardModel | null;
  loading: boolean;
  roomData?: TBattleshipRoomData;
  myPlayer: TPlayerKey;
  secondPlayer: TPlayerKey;
}

export const BattleshipMyBoard = ({
  board,
  loading,
  roomData,
  myPlayer,
  secondPlayer
}: IBattleshipMyBoardProps) => {
  if (!board || loading || !roomData) {
    return null;
  }

  return (
    <div className={styles['battleship__my-board']}>
      <BattleshipBoard
        secondPlayer={secondPlayer}
        roomData={roomData}
        board={board}
      />
      {myPlayer && !roomData[myPlayer]?.isReady && (
        <BattleshipElems
          roomData={roomData}
          myPlayer={myPlayer}
        />
      )}
    </div>
  );
};
