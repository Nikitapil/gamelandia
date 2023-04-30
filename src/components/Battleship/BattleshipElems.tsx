import React, { FC } from 'react';
import { Firestore, doc, setDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BattleShipElem } from './BattleShipElem';
import { BattleshipBoardModel } from '../../games/battleship/models/BattleShipBoardModel';
import {
  mapCellsToFirebase,
  mapShipsToFirebase
} from '../../utils/battleship/battleShipMappers';
import battlShipStyles from '../../styles/battleship.module.scss';
import { AppButton } from '../UI/AppButton';
import { useAppSelector } from '../../hooks/useAppSelector';
import { battleshipSelector } from '../../store/selectors';
import { useBattleshipActions } from '../../games/battleship/hooks/useBattleshipActions';

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
  const { freeShips, board } = useAppSelector(battleshipSelector);
  const { setFreeShips, setBoard, setCurrentFreeShip } = useBattleshipActions();
  const { id } = useParams();
  const { t } = useTranslation();

  const resetShips = () => {
    const newBoard = new BattleshipBoardModel();
    newBoard.initCells();
    newBoard.createAllFreeElems();
    setFreeShips(newBoard.freeElems);
    setBoard(newBoard);
    setCurrentFreeShip(null);
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
