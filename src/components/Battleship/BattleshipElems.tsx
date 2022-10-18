import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Firestore, doc, setDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BattleShipElem } from './BattleShipElem';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { battleShipSelector } from '../../redux/battleships/battleshipSelectors';
import { BattleshipBoardModel } from '../../models/battleship/BattleShipBoardModel';
import {
  setBattleShipBoard,
  setFreeShips,
  setCurrentFreeShip
} from '../../redux/battleships/battleshipActions';
import {
  mapCellsToFirebase,
  mapShipsToFirebase
} from '../../utils/battleship/battleShipMappers';
import battlShipStyles from '../../styles/battleship.module.scss';
import { AppButton } from '../UI/AppButton';

interface BattleshipElemsProps {
  roomData: any;
  firestore: Firestore;
  myPlayer: string;
}

export const BattleshipElems: FC<BattleshipElemsProps> = ({
  firestore,
  roomData,
  myPlayer
}) => {
  const { freeShips } = useTypedSelector(battleShipSelector);
  const { board } = useTypedSelector(battleShipSelector);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { t } = useTranslation();

  const resetShips = () => {
    const newBoard = new BattleshipBoardModel();
    newBoard.initCells();
    newBoard.createAllFreeElems();
    dispatch(setFreeShips(newBoard.freeElems));
    dispatch(setBattleShipBoard(newBoard));
    dispatch(setCurrentFreeShip(null));
  };

  const setIsReady = () => {
    const newData = {
      ...roomData,
      [myPlayer]: {
        ...roomData[myPlayer],
        isReady: true,
        cells: mapCellsToFirebase(board?.cells!),
        ships: mapShipsToFirebase(board?.ships!)
      }
    };
    setDoc(doc(firestore, 'battleship', id!), newData);
  };
  return (
    <div className={battlShipStyles['battleship-elems']}>
      {freeShips.length > 0 ? (
        freeShips.map((el) => <BattleShipElem key={el.id} elem={el} />)
      ) : (
        <AppButton color="danger" onClick={setIsReady} type="button">
          {t('ready')}
        </AppButton>
      )}
      <AppButton color="danger" onClick={resetShips} type="button">
        {t('reset_ships')}
      </AppButton>
    </div>
  );
};
