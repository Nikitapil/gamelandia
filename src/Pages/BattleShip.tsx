import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { BattleshipBoard } from "../components/Battleship/BattleshipBoard";
import { BattleshipElems } from "../components/Battleship/BattleshipElems";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { BattleshipBoardModel } from "../models/battleship/BattleShipBoardModel";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, setDoc } from "firebase/firestore";
import { Auth } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import {
  setBattleShipBoard,
  setBattleShipEnemyBoard,
  setFreeShips,
} from "../redux/battleships/battleshipActions";
import { battleShipSelector } from "../redux/battleships/battleshipSelectors";
import "../styles/battleship.scss";
import { HorizotalLoader } from "../components/UI/Loaders/HorizotalLoader";
import { mapFromFireBaseToBattleShip } from "../utils/battleship/battleShipMappers";

interface BattleShipProps {
  firestore: Firestore;
  auth: Auth;
}

export const BattleShip: FC<BattleShipProps> = ({ firestore, auth }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const [roomData, loading, error, snapshot] = useDocumentData(
    doc(firestore, "battleship", id!)
  );
  const { board, enemyBoard } = useTypedSelector(battleShipSelector);
  const [isFull, setIsFull] = useState(false);
  const [myPlayer, setMyPlayer] = useState("");
  const [secondPlayer, setSecondPlayer] = useState("");
  const [isDataFromServer, setIsDataFromServer] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    if (roomData?.player1 && roomData?.player2) {
      if (
        roomData?.player1.uid !== user?.uid &&
        roomData?.player2.uid !== user?.uid
      ) {
        setIsFull(true);
        return;
      }
    }
    if (!roomData?.player1 && user && roomData) {
      const player1 = {
        uid: user.uid,
        cells: [],
      };
      setDoc(doc(firestore, "battleship", id!), { ...roomData, player1 });
    } else if (
      !roomData?.player2 &&
      user &&
      roomData &&
      roomData?.player1.uid !== user.uid
    ) {
      const player2 = {
        uid: user.uid,
        cells: [],
      };
      setDoc(doc(firestore, "battleship", id!), { ...roomData, player2 });
    }

    if (user && roomData && roomData.player1?.uid === user.uid) {
      setMyPlayer("player1");
      setSecondPlayer("player2");
    } else if (user && roomData && roomData.player2?.uid === user.uid) {
      setMyPlayer("player2");
      setSecondPlayer("player1");
    }
    console.log(roomData);
    if (roomData && roomData.player1?.isReady && roomData.player2?.isReady) {
      if (!roomData.currentPlayer) {
        setDoc(doc(firestore, "battleship", id!), {
          ...roomData,
          currentPlayer: "player1",
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
      dispatch(setBattleShipBoard(newMyBoard));
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
      dispatch(setBattleShipEnemyBoard(newEnemyBoard));
    }
  }, [roomData, user, myPlayer]);

  useEffect(() => {
    if (!isFull && !loading && !isDataFromServer) {
      const newBoard = new BattleshipBoardModel();
      newBoard.initCells();
      newBoard.createAllFreeElems();
      dispatch(setFreeShips(newBoard.freeElems));
      dispatch(setBattleShipBoard(newBoard));
    }
  }, [isFull, loading, isDataFromServer]);

  if (isFull) {
    return (
      <h2 className="battleship__full-message">
        The room is full please choose another one or create new.{" "}
        <Link className="battleship__rooms-link" to="/battleship">
          Go to Rooms
        </Link>{" "}
      </h2>
    );
  }

  return (
    <div className="container battleship">
      <h2 className="page-title">Battleship</h2>
      {loading && <HorizotalLoader color="blue" />}
      {roomData?.currentPlayer && <h3 className="battleship__current-player">Current player: {roomData.currentPlayer}</h3>}
      <div className="battleship__boards">
        <div className="battleship__my-board">
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
        <div className="battleship__enemy-board">
          {isGameStarted && enemyBoard && (
            <BattleshipBoard
              firestore={firestore}
              secondPlayer={secondPlayer}
              roomData={roomData}
              isEnemy={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};
