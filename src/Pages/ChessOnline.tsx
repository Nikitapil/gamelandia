import { Auth } from "firebase/auth";
import { doc, Firestore, setDoc } from "firebase/firestore";
import React, { FC, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { ChessBoardComponent } from "../components/Chess/ChessBoardComponent";
import { ChessTimer } from "../components/Chess/ChessTimer";
import { LostFigures } from "../components/Chess/LostFigures";
import { ChessOnlineLoader } from "../components/Chess/online/ChessOnlineLoader";
import { WinnerModal } from "../components/Chess/WinnerModal";
import { FullRoomMessage } from "../components/common/FullRoomMessage";
import { Board } from "../models/chess/Board";
import { Colors } from "../models/chess/Colors";
import { Player } from "../models/chess/Player";
import "../styles/chess.scss";

interface ChessOnlineProps {
  firestore: Firestore;
  auth: Auth;
}

export const ChessOnline: FC<ChessOnlineProps> = ({ auth, firestore }) => {
  const { id } = useParams();
  const [user, isUserLoading] = useAuthState(auth);
  const [roomData, loading] = useDocumentData(doc(firestore, "chess", id!));
  const [board, setBoard] = useState<Board>(new Board());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [myPlayer, setMyPlayer] = useState(null);
  const [winner, setWinner] = useState("");
  const [isFull, setIsFull] = useState(false);

  useEffect(() => {
    if (roomData?.player1 && roomData?.player2) {
      if (
        roomData?.player1.uid !== user?.uid &&
        roomData?.player2.uid !== user?.uid
      ) {
        setIsFull(true);
        return;
      }
      if(!roomData.isGameStarted) {
        setDoc(doc(firestore, "chess", id!), {
            ...roomData,
            isGameStarted: true
        })
      }
    }
    console.log(roomData);
  }, [roomData, user]);

  const restart = () => {
    setWinner("");
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  };

  const endGame = (color?: string) => {
    if (!color) {
      const winColor =
        currentPlayer?.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
      setWinner(winColor);
    }
  };

  const swapPlayer = () => {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
  };

  if (isFull) {
    return <FullRoomMessage page="/chess/rooms" />
  }

  if (!roomData?.isGameStarted) {
    return <ChessOnlineLoader />;
  }

  return (
    <div className="chess container">
      <div className="chess_timer">
        <button
          className="chess__give-up"
          data-testid="give-up-btn"
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
      />
      <div className="lost">
        <LostFigures title="Black" figures={board.lostBlackFigures} />
        <LostFigures title="White" figures={board.lostWhightFigures} />
      </div>
    </div>
  );
};
