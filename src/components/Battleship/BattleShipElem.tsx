import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useMemo } from 'react';
import { BattleShipElemModel } from '../../games/battleship/models/BattleShipElemModel';
import battlShipStyles from '../../styles/battleship.module.scss';
import { useAppSelector } from '../../hooks/useAppSelector';
import { battleshipSelector } from '../../store/selectors';
import { useBattleshipActions } from '../../games/battleship/hooks/useBattleshipActions';

interface BattleShipElemProps {
  elem: BattleShipElemModel;
}

export const BattleShipElem: FC<BattleShipElemProps> = ({ elem }) => {
  const { board, currentFreeShip } = useAppSelector(battleshipSelector);
  const { setFreeShips, setCurrentFreeShip } = useBattleshipActions();

  const changeDirection = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    elem.changeDirection();
    setFreeShips(board?.freeElems || []);
  };

  const onChooseElem = () => {
    setCurrentFreeShip(elem);
  };

  const currentClass = useMemo(() => {
    const curr =
      elem.id === currentFreeShip?.id ? battlShipStyles['ship-selected'] : '';
    return `${battlShipStyles['battship-elem']} ${
      battlShipStyles[`size_${elem.size}`]
    } ${battlShipStyles[elem.direction]} ${curr}`;
  }, [currentFreeShip?.id, elem.direction, elem.id, elem.size]);

  return (
    <div className={currentClass} onClick={onChooseElem}>
      {elem.size > 1 && (
        <button
          className={battlShipStyles['battship-elembtn']}
          onClick={changeDirection}
          type="button"
        >
          <FontAwesomeIcon icon={faRotate} />
        </button>
      )}
    </div>
  );
};
