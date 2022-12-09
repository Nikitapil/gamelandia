import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { BattleShipElemModel } from '../../models/battleship/BattleShipElemModel';
import {
  setCurrentFreeShip,
  setFreeShips
} from '../../redux/battleships/battleship-actions';
import { battleShipSelector } from '../../redux/battleships/battleship-selectors';
import battlShipStyles from '../../styles/battleship.module.scss';

interface BattleShipElemProps {
  elem: BattleShipElemModel;
}

export const BattleShipElem: FC<BattleShipElemProps> = ({ elem }) => {
  const { board, currentFreeShip } = useTypedSelector(battleShipSelector);
  const dispatch = useDispatch();

  const changeDirection = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    elem.changeDirection();
    dispatch(setFreeShips(board?.freeElems!));
  };

  const onChooseElem = () => {
    dispatch(setCurrentFreeShip(elem));
  };

  const currentClass = useMemo(() => {
    return elem.id === currentFreeShip?.id
      ? battlShipStyles['ship-selected']
      : '';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFreeShip]);

  return (
    <div
      key={elem.id}
      className={`${battlShipStyles['battship-elem']} ${
        battlShipStyles[`size_${elem.size}`]
      } ${battlShipStyles[elem.direction]} ${currentClass}`}
      onClick={onChooseElem}
    >
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
