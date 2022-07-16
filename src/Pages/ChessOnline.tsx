import { Auth } from "firebase/auth";
import { deleteDoc, doc, Firestore, setDoc } from "firebase/firestore";
import React, { FC, useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { ChessBoardComponent } from "../components/Chess/ChessBoardComponent";
import { LostFigures } from "../components/Chess/LostFigures";
import { ChessOnlineLoader } from "../components/Chess/online/ChessOnlineLoader";
import { ChessOnlineTimer } from "../components/Chess/online/ChessOnlineTimer";
import { FullRoomMessage } from "../components/common/FullRoomMessage";
import { WinnerCommon } from "../components/common/WinnerCommon";
import { IChessTime } from "../domain/chessTypes";
import { Board } from "../models/chess/Board";
import { Colors } from "../models/chess/Colors";
import { Player } from "../models/chess/Player";
import "../styles/chess.scss";
import { chessBoardToFirebaseMapper, mapBoardFromFireBase } from "../utils/chess/chessMapper";

interface ChessOnlineProps {
  firestore: Firestore;
  auth: Auth;
}

export const ChessOnline: FC<ChessOnlineProps> = ({ auth, firestore }) => {
  const { id } = useParams();
  const [user, isUserLoading] = useAuthState(auth);
  const [roomData, loading] = useDocumentData(doc(firestore, "chess", id!));
  const [board, setBoard] = useState<Board>(new Board());
  const [whitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [winner, setWinner] = useState("");
  const [isFull, setIsFull] = useState(false);
  const [time, setTime] = useState<IChessTime | null>(null)
  const navigate = useNavigate();
  useEffect(() => {

    if (!isUserLoading && !user) {
      navigate("/login?page=chess/rooms");
    }
    if (user && roomData?.player1 && roomData?.player2) {
      if (
        roomData?.player1.uid !== user?.uid &&
        roomData?.player2.uid !== user?.uid
      ) {
        setIsFull(true);
        return;
      }
      if (!roomData.isGameStarted) {
        board.initCells()
        board.addFigures()
        setDoc(doc(firestore, "chess", id!), {
          ...roomData,
          isGameStarted: true,
          board: chessBoardToFirebaseMapper(board),
          currentPlayer: roomData.player1
        });
        setTime(roomData.time)
      }
    }
    if (roomData?.board) {
      const currPlayer = new Player(roomData.currentPlayer.color)
      const newBoard = mapBoardFromFireBase(roomData.board)
      setBoard(newBoard)
      setCurrentPlayer(currPlayer)
      setTime(roomData.time)
    }
    if (roomData && user && !roomData.player1) {
      const player1 = {
        uid: user.uid,
        name: user.displayName,
        color: Colors.WHITE,
      };
      setDoc(doc(firestore, "chess", id!), { ...roomData, player1 });
    } else if (
      roomData &&
      user &&
      !roomData.player2 &&
      roomData.player1.uid !== user.uid
    ) {
      const player2 = {
        uid: user.uid,
        name: user.displayName,
        color: Colors.BLACK,
      };
      setDoc(doc(firestore, "chess", id!), { ...roomData, player2 });
    }
    if(roomData?.winner) {
      setWinner(roomData.winner.name)
      deleteDoc(doc(firestore, "chess", id!));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomData, user, isUserLoading]);

  const isClickAvailable =useMemo(() => {
      return roomData && roomData?.currentPlayer?.uid === user?.uid
  }, [roomData, user?.uid])

  const endGame = (color?: string) => {
    if (!color) {
      setDoc(doc(firestore, "chess", id!), {
        ...roomData,
        winner: roomData?.currentPlayer
      });
    }
  };

  const swapPlayer = () => {
    if (roomData) {
      const nextPlayer = currentPlayer?.color === Colors.WHITE ? roomData.player2 : roomData.player1
      setDoc(doc(firestore, "chess", id!), {
        ...roomData,
        isGameStarted: true,
        board: chessBoardToFirebaseMapper(board),
        currentPlayer: nextPlayer,
        time: time
      });
    }
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
  };

  if(!roomData && !loading && !winner) {
    navigate('/chess/rooms')
  }

  if (isFull) {
    return <FullRoomMessage page="/chess/rooms" />;
  }

  if (!roomData?.isGameStarted && !winner) {
    return <ChessOnlineLoader />;
  }

  if (winner) {
    return <WinnerCommon page="/chess/rooms" winner={winner} />
  }

  return (
    <div className="chess container">
      <div className="chess_timer">
        {time &&  <ChessOnlineTimer setTime={setTime} time={time} endGame={endGame} currentPlayer={currentPlayer} />}
        <button
          className="chess__give-up"
          data-testid="give-up-btn"
          disabled={!isClickAvailable}
          onClick={() => endGame()}
        >
          Give Up
        </button>
      </div>
      <ChessBoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
        isClickAvailable={isClickAvailable}
      />
      <div className="lost">
        <LostFigures title={"Black " + roomData?.player2.name} figures={board.lostBlackFigures} />
        <LostFigures title={"White " +  roomData?.player1.name} figures={board.lostWhightFigures} />
      </div>
    </div>
  );
};
