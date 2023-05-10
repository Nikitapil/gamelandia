import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { BattleShipElem } from './BattleShipElem';
import { BattleshipBoardModel } from '../models/BattleShipBoardModel';
import styles from '../assets/styles/battleship.module.scss';
import { AppButton } from '../../../components/UI/AppButton/AppButton';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { battleshipSelector } from '../../../store/selectors';
import { useBattleshipActions } from '../hooks/useBattleshipActions';
import { TBattleshipRoomData, TPlayerKey } from '../helpers/types';
import { useBattleshipService } from '../hooks/useBattleshipService';

interface BattleshipElemsProps {
  roomData: TBattleshipRoomData;
  myPlayer: TPlayerKey;
}

export const BattleshipElems: FC<BattleshipElemsProps> = ({
  roomData,
  myPlayer
}) => {
  const { t } = useTranslation();

  const { freeShips, board, currentFreeShip } =
    useAppSelector(battleshipSelector);

  const { setFreeShips, setBoard, setCurrentFreeShip } = useBattleshipActions();

  const service = useBattleshipService();

  const resetShips = () => {
    const newBoard = new BattleshipBoardModel();
    newBoard.initGame();
    setFreeShips(newBoard.freeElems);
    setBoard(newBoard);
    setCurrentFreeShip(null);
  };

  const setIsReady = () => {
    service.setIsReady({
      roomData,
      myPlayer,
      myCells: board?.cells || [],
      myShips: board?.ships || []
    });
  };

  return (
    <div className={styles['battleship-elems']}>
      {freeShips.map((el) => (
        <BattleShipElem
          key={el.id}
          elem={el}
          board={board}
          currentFreeShip={currentFreeShip}
        />
      ))}
      {freeShips.length === 0 && (
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
