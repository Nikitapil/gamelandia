import React, { FC } from 'react'
import { BattleShipElem } from './BattleShipElem';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { battleShipSelector } from '../../redux/battleships/battleshipSelectors';
import { BattleshipBoardModel } from '../../models/battleship/BattleShipBoardModel';
import { useDispatch } from 'react-redux';
import { setBattleShipBoard, setFreeShips, setCurrentFreeShip } from '../../redux/battleships/battleshipActions';
import { Firestore } from 'firebase/firestore'
import { useParams } from 'react-router-dom';
import { doc, collection, query, where, orderBy, addDoc, serverTimestamp, setDoc } from 'firebase/firestore';
interface BattleshipElemsProps {
  roomData: any
  firestore: Firestore
  myPlayer: string
  
}

export const BattleshipElems:FC<BattleshipElemsProps> = ({firestore, roomData, myPlayer}) => {
  const {freeShips} = useTypedSelector(battleShipSelector)
  const { board } = useTypedSelector(battleShipSelector);
  const dispatch = useDispatch()
  const {id} = useParams()

 const resetShips = () => {
  const newBoard = new BattleshipBoardModel()
        newBoard.initCells()
        newBoard.createAllFreeElems()
        dispatch(setFreeShips(newBoard.freeElems))
        dispatch(setBattleShipBoard(newBoard))
        dispatch(setCurrentFreeShip(null))
 }

 const setIsReady = () => {
    const newData = {
      ...roomData,
      [myPlayer]:  {...roomData[myPlayer], isReady: true}
    }
    console.log(newData);
    
  setDoc(doc(firestore, 'battleship', id!), newData)
 }    
  return (
    <div className={`battleship-elems`}>
        {freeShips.length > 0 ? freeShips.map(el => <BattleShipElem key={el.id} elem={el} />) : <button className='battleship-btn' onClick={setIsReady}>Ready</button>}
        <button className='battleship-btn' onClick={resetShips}>Reset Ships</button>
    </div>
  )
}
