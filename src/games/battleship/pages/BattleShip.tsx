import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { BattleshipBoard } from '../components/BattleshipBoard';
import { BattleshipElems } from '../components/BattleshipElems';
import { BattleshipBoardModel } from '../models/BattleShipBoardModel';
import { HorizotalLoader } from '../../../components/UI/Loaders/HorizotalLoader';
import { mapFromFireBaseToBattleShip } from '../helpers/battleShipMappers';
import { FullRoomMessage } from '../../components/FullRoomMessage';
import { WinnerCommon } from '../../components/WinnerCommon';
import styles from '../assets/styles/battleship.module.scss';
import { useBreadcrumbs } from '../../../app/hooks/useBreadcrumbs';
import { breadcrumbs } from '../../../constants/breadcrumbs';
import { useTitle } from '../../../hooks/useTitle';
import { DynoGame } from '../../dyno/components/DynoGame';
import { ERoutes } from '../../../constants/routes';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { authSelector, battleshipSelector } from '../../../store/selectors';
import { useBattleshipActions } from '../hooks/useBattleshipActions';
import { FirebaseContext } from '../../../context/firebase-context/FirebaseContext';
import { TPlayerKey } from '../helpers/types';
import { useBattleshipRoomData } from '../hooks/useBattleshipRoomData';

export const BattleShip = () => {
  const { t } = useTranslation();
  useTitle(t('battleship'));
  useBreadcrumbs([
    breadcrumbs.main,
    breadcrumbs.battleshipRooms,
    breadcrumbs.battleship
  ]);
  const { id } = useParams();

  const { user, isAuthLoading } = useAppSelector(authSelector);
  const { board, enemyBoard } = useAppSelector(battleshipSelector);
  const { setBoard, setEnemyBoard, setFreeShips } = useBattleshipActions();

  const { roomData, loading, isFull } = useBattleshipRoomData(id!);

  const firestore = useContext(FirebaseContext);
  const [myPlayer, setMyPlayer] = useState<TPlayerKey>('');
  const [secondPlayer, setSecondPlayer] = useState<TPlayerKey>('');
  const [isDataFromServer, setIsDataFromServer] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const navigate = useNavigate();
  const [winner, setWinner] = useState('');

  useEffect(() => {
    if (!roomData?.player1 && user && roomData) {
      const player1 = {
        uid: user.id,
        name: user.username,
        cells: []
      };
      setDoc(doc(firestore, 'battleship', id!), { ...roomData, player1 });
    } else if (
      !roomData?.player2 &&
      user &&
      roomData &&
      roomData?.player1?.uid !== user.id
    ) {
      const player2 = {
        uid: user.id,
        name: user.username,
        cells: []
      };
      setDoc(doc(firestore, 'battleship', id!), { ...roomData, player2 });
    }

    if (user && roomData && roomData.player1?.uid === user.id) {
      setMyPlayer('player1');
      setSecondPlayer('player2');
    } else if (user && roomData && roomData.player2?.uid === user.id) {
      setMyPlayer('player2');
      setSecondPlayer('player1');
    }
    if (roomData && roomData.player1?.isReady && roomData.player2?.isReady) {
      if (!roomData.currentPlayer) {
        setDoc(doc(firestore, 'battleship', id!), {
          ...roomData,
          currentPlayer: 'player1'
        });
      }
      setIsGameStarted(true);
    }
    if (
      user &&
      roomData &&
      myPlayer &&
      roomData[myPlayer] &&
      roomData[myPlayer]?.cells.length
    ) {
      setIsDataFromServer(true);
      const newMyBoard = mapFromFireBaseToBattleShip(
        roomData[myPlayer]?.cells || [],
        roomData[myPlayer]?.ships || [],
        false
      );
      setBoard(newMyBoard);
    }
    if (
      user &&
      roomData &&
      secondPlayer &&
      roomData[secondPlayer] &&
      roomData[secondPlayer]?.cells.length
    ) {
      const newEnemyBoard = mapFromFireBaseToBattleShip(
        roomData[secondPlayer]?.cells || [],
        roomData[secondPlayer]?.ships || [],
        true
      );
      setEnemyBoard(newEnemyBoard);
    }
    if (roomData?.winner) {
      setWinner(roomData?.winner);
      deleteDoc(doc(firestore, 'battleship', id!));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomData, user, myPlayer]);

  useEffect(() => {
    if (!isFull && !loading && !isDataFromServer) {
      const newBoard = new BattleshipBoardModel();
      newBoard.initGame();
      setFreeShips(newBoard.freeElems);
      setBoard(newBoard);
    }
  }, [isFull, loading, isDataFromServer]);

  if (!roomData && !loading && !winner) {
    navigate(ERoutes.BATTLESHIP);
  }

  if (!isAuthLoading && !user) {
    navigate(`${ERoutes.LOGIN}?page=battleship`);
  }

  if (isFull) {
    return <FullRoomMessage page={`${ERoutes.BATTLESHIP}`} />;
  }

  if (winner) {
    return <WinnerCommon page={`${ERoutes.BATTLESHIP}`} winner={winner} />;
  }

  return (
    <div className={`container ${styles.battleship}`}>
      <h2 className="page-title">{t('battleship')}</h2>
      {loading && <HorizotalLoader color="blue" />}
      {roomData?.currentPlayer && (
        <h3 className={styles['battleship__current-player']}>
          {t('current_player')}: {roomData[roomData.currentPlayer]?.name}
        </h3>
      )}
      <div className={styles.battleship__boards}>
        <div className={styles['battleship__my-board']}>
          {board && !loading && roomData && (
            <BattleshipBoard
              secondPlayer={secondPlayer}
              roomData={roomData}
              isEnemy={false}
            />
          )}
          {board &&
            roomData &&
            myPlayer &&
            roomData[myPlayer] &&
            !roomData[myPlayer]?.isReady && (
              <BattleshipElems roomData={roomData} myPlayer={myPlayer} />
            )}
        </div>
        <div className={styles['battleship__enemy-board']}>
          {isGameStarted && enemyBoard && roomData ? (
            <BattleshipBoard
              secondPlayer={secondPlayer}
              roomData={roomData}
              isEnemy
            />
          ) : (
            <div className={styles['battle-ship__waiting']}>
              <p className={styles['waiting-text']}>{t('waiting_player')}</p>
              {roomData && myPlayer && roomData[myPlayer]?.isReady && (
                <DynoGame />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
