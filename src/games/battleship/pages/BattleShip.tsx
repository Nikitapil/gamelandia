import React, { useCallback, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BattleshipBoardModel } from '../models/BattleShipBoardModel';
import { HorizotalLoader } from '../../../components/UI/Loaders/HorizotalLoader';
import { FullRoomMessage } from '../../components/FullRoomMessage/FullRoomMessage';
import { WinnerCommon } from '../../components/WinnerCommon/WinnerCommon';
import styles from '../assets/styles/battleship.module.scss';
import { useBreadcrumbs } from '../../../app/hooks/useBreadcrumbs';
import { breadcrumbs } from '../../../constants/breadcrumbs';
import { useTitle } from '../../../hooks/useTitle';
import { ERoutes } from '../../../router/constants';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { authSelector, battleshipSelector } from '../../../store/selectors';
import { useBattleshipActions } from '../hooks/useBattleshipActions';
import { TPlayerKey } from '../helpers/types';
import { useBattleshipRoomData } from '../hooks/useBattleshipRoomData';
import { useBattleshipService } from '../hooks/useBattleshipService';
import { BattleshipMyBoard } from '../components/BattleshipMyBoard';
import { BattleshipEnemyBoard } from '../components/BattleshipEnemyBoard';
import { GameTitleWithWinners } from '../../components/GameTitleWithWinners';
import { EGamesNames } from '../../constants';

export const BattleShip = () => {
  const { t } = useTranslation();
  useTitle(t('battleship'));
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.battleshipRooms, breadcrumbs.battleship]);
  const { id } = useParams();

  const { user, isAuthLoading } = useAppSelector(authSelector);
  const { board, enemyBoard } = useAppSelector(battleshipSelector);
  const { setBoard, setEnemyBoard, setFreeShips } = useBattleshipActions();

  const { roomData, loading, isFull } = useBattleshipRoomData(id!);
  const service = useBattleshipService();

  const [myPlayer, setMyPlayer] = useState<TPlayerKey>('');
  const [secondPlayer, setSecondPlayer] = useState<TPlayerKey>('');
  const [isDataFromServer, setIsDataFromServer] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [winner, setWinner] = useState('');

  const setLocalPlayers = useCallback(() => {
    if (!user || !roomData) {
      return;
    }
    const myPlayerValue = roomData.player1?.uid === user.id ? 'player1' : 'player2';
    const secondPlayerValue = roomData.player1?.uid === user.id ? 'player2' : 'player1';

    setMyPlayer(myPlayerValue);
    setSecondPlayer(secondPlayerValue);
  }, [roomData, user]);

  useEffect(() => {
    if (!user || !roomData) {
      return;
    }

    // Setup players to db
    service.setPlayers(user, roomData);

    // Setup players to local state
    setLocalPlayers();

    // Start game if players are both ready
    const isStarted = service.startGame(roomData);
    setIsGameStarted(isStarted);

    // Parse my board from db
    const myBoard = service.getBoardFromFireBase(roomData, myPlayer, false);
    if (myBoard) {
      setIsDataFromServer(true);
      setBoard(myBoard);
    }

    // Parse enemy board from db
    const enemyBoardFromServer = service.getBoardFromFireBase(roomData, secondPlayer, true);
    setEnemyBoard(enemyBoardFromServer);

    if (roomData.winner) {
      setWinner(roomData.winner);
      service.deleteRoom(roomData.id);
    }
  }, [roomData, user, myPlayer, service, setLocalPlayers, secondPlayer, setEnemyBoard, setBoard]);

  useEffect(() => {
    if (!isFull && !loading && !isDataFromServer) {
      const newBoard = new BattleshipBoardModel();
      newBoard.initGame();
      setFreeShips(newBoard.freeElems);
      setBoard(newBoard);
    }
  }, [isFull, loading, isDataFromServer, setFreeShips, setBoard]);

  if (!roomData && !loading && !winner) {
    return <Navigate to={ERoutes.BATTLESHIP} />;
  }

  if (!isAuthLoading && !user) {
    return <Navigate to={`${ERoutes.LOGIN}?page=battleship`} />;
  }

  if (isFull) {
    return <FullRoomMessage page={`${ERoutes.BATTLESHIP}`} />;
  }

  if (winner) {
    return (
      <WinnerCommon
        page={`${ERoutes.BATTLESHIP}`}
        winner={winner}
      />
    );
  }

  return (
    <div className={`container ${styles.battleship}`}>
      <GameTitleWithWinners
        title={t('battleship')}
        gameName={EGamesNames.BATTLESHIP}
      />
      {loading && <HorizotalLoader color="blue" />}
      {roomData?.currentPlayer && (
        <h3 className={styles['battleship__current-player']}>
          {t('current_player')}: {roomData[roomData.currentPlayer]?.name}
        </h3>
      )}
      <div className={styles.battleship__boards}>
        <BattleshipMyBoard
          board={board}
          loading={loading}
          myPlayer={myPlayer}
          secondPlayer={secondPlayer}
          roomData={roomData}
        />
        <BattleshipEnemyBoard
          isGameStarted={isGameStarted}
          board={enemyBoard}
          myPlayer={myPlayer}
          secondPlayer={secondPlayer}
          roomData={roomData}
        />
      </div>
    </div>
  );
};
