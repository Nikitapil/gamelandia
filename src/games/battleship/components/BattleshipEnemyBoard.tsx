import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../assets/styles/battleship.module.scss';
import { BattleshipBoard } from './BattleshipBoard';
import { DynoGame } from '../../dyno/components/DynoGame';
import { BattleshipBoardModel } from '../models/BattleShipBoardModel';
import { TBattleshipRoomData, TPlayerKey } from '../helpers/types';

interface IBattleshipEnemyBoardProps {
  isGameStarted: boolean;
  board: BattleshipBoardModel | null;
  roomData?: TBattleshipRoomData;
  myPlayer: TPlayerKey;
  secondPlayer: TPlayerKey;
}

export const BattleshipEnemyBoard = ({
  isGameStarted,
  board,
  roomData,
  myPlayer,
  secondPlayer
}: IBattleshipEnemyBoardProps) => {
  const { t } = useTranslation();
  if (isGameStarted && board && roomData) {
    return (
      <BattleshipBoard
        secondPlayer={secondPlayer}
        roomData={roomData}
        board={board}
      />
    );
  }

  return (
    <div className={styles['battle-ship__waiting']}>
      <p className={styles['waiting-text']}>{t('waiting_player')}</p>
      {roomData && myPlayer && roomData[myPlayer]?.isReady && <DynoGame />}
    </div>
  );
};
