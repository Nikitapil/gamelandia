import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useParams } from 'react-router-dom';
import { ChessBoardComponent } from '../components/ChessBoardComponent';
import { LostFigures } from '../components/lost-figures/LostFigures';
import { ChessOnlineLoader } from '../components/online/ChessOnlineLoader';
import { ChessOnlineTimer } from '../components/online/ChessOnlineTimer';
import { FullRoomMessage } from '../../components/FullRoomMessage/FullRoomMessage';
import { WinnerCommon } from '../../components/WinnerCommon/WinnerCommon';
import { breadcrumbs } from '../../../constants/breadcrumbs';
import { IChessTime } from '../helpers/types';
import { useBreadcrumbs } from '../../../app/hooks/useBreadcrumbs';
import { useTitle } from '../../../hooks/useTitle';
import { Board } from '../models/Board';
import { EChessColors } from '../models/EChessColors';
import { Player } from '../models/Player';
import { AppButton } from '../../../components/UI/AppButton/AppButton';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { authSelector } from '../../../store/selectors';
import { useChessOnlineRoomData } from '../hooks/useChessOnlineRoomData';
import { ERoutes } from '../../../constants/routes';
import { useChessOnlineService } from '../hooks/useChessOnlineService';
import styles from '../assets/styles/chess.module.scss';

export const ChessOnline = () => {
  const { t } = useTranslation();
  useTitle(`${t('chess')} online`);
  useBreadcrumbs([
    breadcrumbs.main,
    breadcrumbs.chessTypes,
    breadcrumbs.chessRooms,
    breadcrumbs.chessOnline
  ]);

  const { id } = useParams();
  const { user, isAuthLoading } = useAppSelector(authSelector);
  const { roomData, loading, isFull, isReadyToStart } = useChessOnlineRoomData(id!);
  const service = useChessOnlineService();

  const [board, setBoard] = useState<Board>(new Board());
  const [whitePlayer] = useState(new Player(EChessColors.WHITE));
  const [blackPlayer] = useState(new Player(EChessColors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [winner, setWinner] = useState('');
  const [time, setTime] = useState<IChessTime | null>(null);

  useEffect(() => {
    if (!roomData || !user || winner) {
      return;
    }

    service.setupPlayers(roomData, user);

    if (isReadyToStart) {
      const newBoard = new Board();
      newBoard.initNewGame();
      setBoard(newBoard);
      service.startGame(roomData, newBoard);
      setTime(roomData.time);
    }

    const dataFromFireBase = service.getDataFromFirebase(roomData);
    if (dataFromFireBase) {
      setBoard(dataFromFireBase.newBoard);
      setCurrentPlayer(dataFromFireBase.actualCurrentPlayer);
      setTime(dataFromFireBase.time);
    }

    if (roomData?.winner) {
      setWinner(roomData.winner.name);
      service.deleteRoom(roomData.id);
    }
  }, [roomData, user, isAuthLoading, service, isReadyToStart, winner]);

  const isClickAvailable = useMemo(() => {
    return roomData?.currentPlayer?.uid === user?.id;
  }, [roomData, user?.id]);

  const endGame = async () => {
    if (!currentPlayer || !roomData) {
      return;
    }
    await service.setWinner(roomData, currentPlayer);
  };

  const swapPlayer = async () => {
    if (roomData && time) {
      await service.swapPlayer({
        roomData,
        currentPlayer,
        board,
        time
      });
    }
    setCurrentPlayer(currentPlayer?.color === EChessColors.WHITE ? blackPlayer : whitePlayer);
  };

  if (!isAuthLoading && !user) {
    return <Navigate to={`${ERoutes.LOGIN}?page=chess/rooms`} />;
  }

  if (!roomData && !loading && !winner) {
    return <Navigate to={ERoutes.CHESS_ROOMS} />;
  }

  if (isFull) {
    return <FullRoomMessage page="/chess/rooms" />;
  }

  if (!roomData?.isGameStarted && !winner) {
    return <ChessOnlineLoader />;
  }

  if (winner) {
    return (
      <WinnerCommon
        page="/chess/rooms"
        winner={winner}
      />
    );
  }

  return (
    <div className={`${styles.chess} container`}>
      <div className={styles.chess_timer}>
        {time && (
          <ChessOnlineTimer
            setTime={setTime}
            time={time}
            endGame={endGame}
            currentPlayer={currentPlayer}
          />
        )}
        <AppButton
          color="danger"
          testId="give-up-btn"
          disabled={!isClickAvailable}
          onClick={() => endGame()}
          type="button"
        >
          {t('give_up')}
        </AppButton>
      </div>
      <ChessBoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
        isClickAvailable={isClickAvailable}
      />
      <div className={styles.lost}>
        <LostFigures
          title={`${t('black')} ${roomData?.player2?.name}`}
          figures={board.lostBlackFigures}
        />
        <LostFigures
          title={`${t('white')} ${roomData?.player1?.name}`}
          figures={board.lostWhiteFigures}
        />
      </div>
    </div>
  );
};
