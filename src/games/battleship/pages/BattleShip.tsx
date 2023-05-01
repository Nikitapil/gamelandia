import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { doc, setDoc, deleteDoc, Firestore } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { BattleshipBoard } from '../components/BattleshipBoard';
import { BattleshipElems } from '../components/BattleshipElems';
import { BattleshipBoardModel } from '../models/BattleShipBoardModel';
import { HorizotalLoader } from '../../../components/UI/Loaders/HorizotalLoader';
import { mapFromFireBaseToBattleShip } from '../helpers/battleShipMappers';
import { FullRoomMessage } from '../../components/FullRoomMessage';
import { WinnerCommon } from '../../components/WinnerCommon';
import battlshipStyles from '../assets/styles/battleship.module.scss';
import { useBreadcrumbs } from '../../../app/hooks/useBreadcrumbs';
import { breadcrumbs } from '../../../constants/breadcrumbs';
import { useTitle } from '../../../hooks/useTitle';
import { DynoGame } from '../../dyno/components/DynoGame';
import { ERoutes } from '../../../constants/routes';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { authSelector, battleshipSelector } from '../../../store/selectors';
import { useBattleshipActions } from '../hooks/useBattleshipActions';

interface BattleShipProps {
  firestore: Firestore;
}

export const BattleShip: FC<BattleShipProps> = ({ firestore }) => {
  const { t } = useTranslation();
  useTitle(t('battleship'));
  useBreadcrumbs([
    breadcrumbs.main,
    breadcrumbs.battleshipRooms,
    breadcrumbs.battleship
  ]);
  const { id } = useParams();
  const { user, isAuthLoading } = useAppSelector(authSelector);
  const [roomData, loading] = useDocumentData(
    doc(firestore, 'battleship', id!)
  );
  const { board, enemyBoard } = useAppSelector(battleshipSelector);
  const { setBoard, setEnemyBoard, setFreeShips } = useBattleshipActions();
  const [isFull, setIsFull] = useState(false);
  const [myPlayer, setMyPlayer] = useState('');
  const [secondPlayer, setSecondPlayer] = useState('');
  const [isDataFromServer, setIsDataFromServer] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const navigate = useNavigate();
  const [winner, setWinner] = useState('');

  useEffect(() => {
    if (roomData?.player1 && roomData?.player2) {
      if (
        roomData?.player1.uid !== user?.id &&
        roomData?.player2.uid !== user?.id
      ) {
        setIsFull(true);
        return;
      }
    }
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
      roomData?.player1.uid !== user.id
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
      roomData[myPlayer] &&
      roomData[myPlayer].cells.length
    ) {
      setIsDataFromServer(true);
      const newMyBoard = mapFromFireBaseToBattleShip(
        roomData[myPlayer].cells,
        roomData[myPlayer].ships,
        false
      );
      setBoard(newMyBoard);
    }
    if (
      user &&
      roomData &&
      roomData[secondPlayer] &&
      roomData[secondPlayer].cells.length
    ) {
      const newEnemyBoard = mapFromFireBaseToBattleShip(
        roomData[secondPlayer].cells,
        roomData[secondPlayer].ships,
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
      newBoard.initCells();
      newBoard.createAllFreeElems();
      setFreeShips(newBoard.freeElems);
      setBoard(newBoard);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className={`container ${battlshipStyles.battleship}`}>
      <h2 className="page-title">{t('battleship')}</h2>
      {loading && <HorizotalLoader color="blue" />}
      {roomData?.currentPlayer && (
        <h3 className={battlshipStyles['battleship__current-player']}>
          {t('current_player')}: {roomData[roomData.currentPlayer].name}
        </h3>
      )}
      <div className={battlshipStyles.battleship__boards}>
        <div className={battlshipStyles['battleship__my-board']}>
          {board && !loading && (
            <BattleshipBoard
              firestore={firestore}
              secondPlayer={secondPlayer}
              roomData={roomData}
              isEnemy={false}
            />
          )}
          {board &&
            roomData &&
            roomData[myPlayer] &&
            !roomData[myPlayer].isReady && (
              <BattleshipElems
                roomData={roomData}
                firestore={firestore}
                myPlayer={myPlayer}
              />
            )}
        </div>
        <div className={battlshipStyles['battleship__enemy-board']}>
          {isGameStarted && enemyBoard ? (
            <BattleshipBoard
              firestore={firestore}
              secondPlayer={secondPlayer}
              roomData={roomData}
              isEnemy
            />
          ) : (
            <div className={battlshipStyles['battle-ship__waiting']}>
              <p className={battlshipStyles['waiting-text']}>
                {t('waiting_player')}
              </p>
              {roomData && roomData[myPlayer]?.isReady && <DynoGame />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
