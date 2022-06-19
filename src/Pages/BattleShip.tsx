import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { BattleshipBoard } from "../components/Battleship/BattleshipBoard";
import { BattleshipElems } from "../components/Battleship/BattleshipElems";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { BattleshipBoardModel } from "../models/battleship/BattleShipBoardModel";
import { useDocumentData  } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, collection, query, where, orderBy, addDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { Auth } from "firebase/auth";
import { Firestore } from 'firebase/firestore'
import {
  setBattleShipBoard,
  setFreeShips,
} from "../redux/battleships/battleshipActions";
import { battleShipSelector } from "../redux/battleships/battleshipSelectors";
import "../styles/battleship.scss";
import { HorizotalLoader } from "../components/UI/Loaders/HorizotalLoader";

interface BattleShipProps {
  firestore: Firestore;
   auth: Auth;
}

export const BattleShip:FC<BattleShipProps> = ({firestore, auth}) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const [roomData, loading, error, snapshot] = useDocumentData(doc(firestore, 'battleship', id!))
  const { board } = useTypedSelector(battleShipSelector);
  const [isFull, setIsFull] = useState(false)
  const [myPlayer, setMyPlayer]= useState('')

  useEffect(() => {
    if (roomData?.player1 && roomData?.player2) {
      if (roomData?.player1.uid !== user?.uid && roomData?.player2.uid !== user?.uid) {
        setIsFull(true)
        return
      }
    }
    if (!roomData?.player1 && user && roomData) {
      const player1 = {
        uid: user.uid,
        cells: []
      }
      setDoc(doc(firestore, 'battleship', id!), {...roomData, player1 })
    } else if (!roomData?.player2 && user && roomData && roomData?.player1.uid !== user.uid ) {
      const player2 = {
        uid: user.uid,
        cells: []
      }
      setDoc(doc(firestore, 'battleship', id!), {...roomData, player2 })
    }
    
    if (user && roomData && roomData.player1.uid === user.uid ) {
      setMyPlayer('player1')
    } else if (user && roomData && roomData.player2.uid === user.uid) {
      setMyPlayer('player2')
    }
    
  }, [roomData, user]);


  useEffect(() => {
    if (!isFull) {
      const newBoard = new BattleshipBoardModel();
      newBoard.initCells();
      newBoard.createAllFreeElems();
      dispatch(setFreeShips(newBoard.freeElems));
      dispatch(setBattleShipBoard(newBoard));
    }
  }, [isFull])

  if(isFull) {
    return (<h2 className="battleship__full-message">The room is full please choose another one or create new. <Link className="battleship__rooms-link" to='/battleship'>Go to Rooms</Link> </h2>)
  }

  return (
    <div className="container battleship">
      <h2 className="page-title">Battleship</h2>
      {loading && <HorizotalLoader color="blue" />}
      {board && !loading && <BattleshipBoard />}
      {board && roomData && roomData[myPlayer] && !roomData[myPlayer].isReady && <BattleshipElems roomData={roomData} firestore={firestore} myPlayer={myPlayer} />}
    </div>
  );
};

