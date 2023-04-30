import React, { memo, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import { doc, setDoc, Firestore } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { BattleshipCellModel } from '../models/BattleShipCellModel';
import {
  mapCellsToFirebase,
  mapShipsToFirebase
} from '../helpers/battleShipMappers';
import battlShipStyles from '../assets/styles/battleship.module.scss';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { battleshipSelector } from '../../../store/selectors';
import { useBattleshipActions } from '../hooks/useBattleshipActions';

interface BattleshipCellProps {
  cell: BattleshipCellModel;
  roomData: any;
  secondPlayer: string;
  firestore: Firestore;
}

export const BattleshipCell = memo(
  ({ cell, roomData, secondPlayer, firestore }: BattleshipCellProps) => {
    const { currentFreeShip, board, enemyBoard } =
      useAppSelector(battleshipSelector);
    const { setBoard, setFreeShips, setCurrentFreeShip } =
      useBattleshipActions();
    const { id } = useParams();

    const onMouseOver = () => {
      if (currentFreeShip && cell.isEmpty) {
        const isAddVailable = board?.checkIsAddAvailable(cell, currentFreeShip);
        if (isAddVailable) {
          board?.highlightCells(cell, currentFreeShip);
        }
        setBoard(board);
      }
    };

    const onClick = () => {
      if (currentFreeShip && cell.isAddAvailable) {
        board?.addShipOnBoard(cell, currentFreeShip);
        setBoard(board);
        setFreeShips(board?.freeElems!);
        setCurrentFreeShip(null);
      }
      if (
        cell.board.isEnemyBoard &&
        roomData.currentPlayer !== secondPlayer &&
        !cell.isAttacked
      ) {
        cell.setIsAttacked();
        const isWinner = enemyBoard?.checkWinner();
        const newData = {
          ...roomData,
          [secondPlayer]: {
            ...roomData[secondPlayer],
            cells: mapCellsToFirebase(enemyBoard?.cells!),
            ships: mapShipsToFirebase(enemyBoard?.ships!)
          },
          winner: isWinner ? roomData[roomData.currentPlayer].name : ''
        };
        if (!cell.elem) {
          newData.currentPlayer = secondPlayer;
        }
        setDoc(doc(firestore, 'battleship', id!), newData);
      }
    };

    const icon = useMemo(() => {
      if (cell.isAttacked) {
        return cell.elem
          ? {
              className: battlShipStyles['battleship__under-attack'],
              icon: faXmark
            }
          : { className: battlShipStyles.battleship__missed, icon: faCircle };
      }
      return null;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cell.isAttacked]);

    return (
      <div
        className={`${battlShipStyles.battleship__cell} ${
          cell.isAddAvailable ? battlShipStyles['battship-highlighted'] : ''
        } ${
          cell.elem && !cell.board.isEnemyBoard
            ? battlShipStyles['with-ship']
            : ''
        } ${
          cell.elem?.isDestroyed ? battlShipStyles.battleship__destroyed : ''
        }`}
        onMouseOver={onMouseOver}
        onClick={onClick}
      >
        {icon && <FontAwesomeIcon {...icon} />}
      </div>
    );
  }
);
