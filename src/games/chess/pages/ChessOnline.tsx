import { deleteDoc, doc, Firestore, setDoc } from 'firebase/firestore';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { ChessBoardComponent } from '../components/ChessBoardComponent';
import { LostFigures } from '../components/LostFigures';
import { ChessOnlineLoader } from '../components/online/ChessOnlineLoader';
import { ChessOnlineTimer } from '../components/online/ChessOnlineTimer';
import { FullRoomMessage } from '../../components/FullRoomMessage';
import { WinnerCommon } from '../../components/WinnerCommon';
import { breadcrumbs } from '../../../constants/breadcrumbs';
import { IChessTime } from '../helpers/types';
import { useBreadcrumbs } from '../../../app/hooks/useBreadcrumbs';
import { useTitle } from '../../../hooks/useTitle';
import { Board } from '../models/Board';
import { Colors } from '../models/Colors';
import { Player } from '../models/Player';
import '../assets/styles/chess.scss';
import {
  chessBoardToFirebaseMapper,
  mapBoardFromFireBase
} from '../helpers/chessMapper';
import { AppButton } from '../../../components/UI/AppButton';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { authSelector } from '../../../store/selectors';

interface ChessOnlineProps {
  firestore: Firestore;
}

export const ChessOnline: FC<ChessOnlineProps> = ({ firestore }) => {
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
  const [roomData, loading] = useDocumentData(doc(firestore, 'chess', id!));
  const [board, setBoard] = useState<Board>(new Board());
  const [whitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [winner, setWinner] = useState('');
  const [isFull, setIsFull] = useState(false);
  const [time, setTime] = useState<IChessTime | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthLoading && !user) {
      navigate('/login?page=chess/rooms');
    }
    if (user && roomData?.player1 && roomData?.player2) {
      if (
        roomData?.player1.uid !== user?.id &&
        roomData?.player2.uid !== user?.id
      ) {
        setIsFull(true);
        return;
      }
      if (!roomData.isGameStarted) {
        board.initCells();
        board.addFigures();
        setDoc(doc(firestore, 'chess', id!), {
          ...roomData,
          isGameStarted: true,
          board: chessBoardToFirebaseMapper(board),
          currentPlayer: roomData.player1
        });
        setTime(roomData.time);
      }
    }
    if (roomData?.board) {
      const currPlayer = new Player(roomData.currentPlayer.color);
      const newBoard = mapBoardFromFireBase(roomData.board);
      setBoard(newBoard);
      setCurrentPlayer(currPlayer);
      setTime(roomData.time);
    }
    if (roomData && user && !roomData.player1) {
      const player1 = {
        uid: user.id,
        name: user.username,
        color: Colors.WHITE
      };
      setDoc(doc(firestore, 'chess', id!), { ...roomData, player1 });
    } else if (
      roomData &&
      user &&
      !roomData.player2 &&
      roomData.player1.uid !== user.id
    ) {
      const player2 = {
        uid: user.id,
        name: user.username,
        color: Colors.BLACK
      };
      setDoc(doc(firestore, 'chess', id!), { ...roomData, player2 });
    }
    if (roomData?.winner) {
      setWinner(roomData.winner.name);
      deleteDoc(doc(firestore, 'chess', id!));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomData, user, isAuthLoading]);

  const isClickAvailable = useMemo(() => {
    return roomData && roomData?.currentPlayer?.uid === user?.id;
  }, [roomData, user?.id]);

  const endGame = (color?: string) => {
    if (!color) {
      const winnerPlayer =
        currentPlayer?.color === Colors.WHITE
          ? roomData?.player2
          : roomData?.player1;
      setDoc(doc(firestore, 'chess', id!), {
        ...roomData,
        winner: winnerPlayer
      });
    }
  };

  const swapPlayer = () => {
    if (roomData) {
      const nextPlayer =
        currentPlayer?.color === Colors.WHITE
          ? roomData.player2
          : roomData.player1;
      setDoc(doc(firestore, 'chess', id!), {
        ...roomData,
        isGameStarted: true,
        board: chessBoardToFirebaseMapper(board),
        currentPlayer: nextPlayer,
        time
      });
    }
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
  };

  if (!roomData && !loading && !winner) {
    navigate('/chess/rooms');
  }

  if (isFull) {
    return <FullRoomMessage page="/chess/rooms" />;
  }

  if (!roomData?.isGameStarted && !winner) {
    return <ChessOnlineLoader />;
  }

  if (winner) {
    return <WinnerCommon page="/chess/rooms" winner={winner} />;
  }

  return (
    <div className="chess container">
      <div className="chess_timer">
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
      <div className="lost">
        <LostFigures
          title={`${t('black')} ${roomData?.player2.name}`}
          figures={board.lostBlackFigures}
        />
        <LostFigures
          title={`${t('white')} ${roomData?.player1.name}`}
          figures={board.lostWhightFigures}
        />
      </div>
    </div>
  );
};
