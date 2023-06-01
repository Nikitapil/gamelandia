import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, SyntheticEvent, useMemo } from 'react';
import { BattleShipElemModel } from '../models/BattleShipElemModel';
import styles from '../assets/styles/battleship.module.scss';
import { useBattleshipActions } from '../hooks/useBattleshipActions';
import { BattleshipBoardModel } from '../models/BattleShipBoardModel';

interface IBattleShipElemProps {
  elem: BattleShipElemModel;
  board: BattleshipBoardModel | null;
  currentFreeShip: BattleShipElemModel | null;
}

export const BattleShipElem: FC<IBattleShipElemProps> = ({ elem, board, currentFreeShip }) => {
  const { setFreeShips, setCurrentFreeShip } = useBattleshipActions();

  const changeDirection = (e: SyntheticEvent) => {
    e.stopPropagation();
    elem.changeDirection();
    setFreeShips(board?.freeElems || []);
  };

  const onChooseElem = () => {
    setCurrentFreeShip(elem);
  };

  const currentClass = useMemo(() => {
    const curr = elem.id === currentFreeShip?.id ? styles['ship-selected'] : '';
    return `${styles['battship-elem']} ${styles[`size_${elem.size}`]} ${
      styles[elem.direction]
    } ${curr}`;
  }, [currentFreeShip?.id, elem.direction, elem.id, elem.size]);

  return (
    <div
      className={currentClass}
      onClick={onChooseElem}
    >
      {elem.size > 1 && (
        <button
          className={styles['battship-elembtn']}
          onClick={changeDirection}
          type="button"
        >
          <FontAwesomeIcon icon={faRotate} />
        </button>
      )}
    </div>
  );
};
