import React, { FC, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { BattleshipCellModel } from "../../models/battleship/BattleShipCellModel";
import {
  setBattleShipBoard,
  setCurrentFreeShip,
  setFreeShips,
} from "../../redux/battleships/battleshipActions";
import { battleShipSelector } from "../../redux/battleships/battleshipSelectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import { doc, setDoc, Firestore } from "firebase/firestore";
import {
  mapCellsToFirebase,
  mapShipsToFirebase,
} from "../../utils/battleship/battleShipMappers";
import { useParams } from "react-router-dom";
interface BattleshipCellProps {
  cell: BattleshipCellModel;
  roomData: any;
  secondPlayer: string;
  firestore: Firestore;
}

export const BattleshipCell: FC<BattleshipCellProps> = ({
  cell,
  roomData,
  secondPlayer,
  firestore,
}) => {
  const { currentFreeShip, board, enemyBoard } =
    useTypedSelector(battleShipSelector);
  const dispatch = useDispatch();
  const { id } = useParams();
  const onMouseOver = () => {
    if (currentFreeShip && cell.isEmpty) {
      const isAddVailable = board?.checkIsAddAvailable(cell, currentFreeShip);
      if (isAddVailable) {
        board?.highlightCells(cell, currentFreeShip);
      }
      dispatch(setBattleShipBoard(board));
    }
  };

  const onClick = () => {
    if (currentFreeShip && cell.isAddAvailable) {
      board?.addShipOnBoard(cell, currentFreeShip);
      dispatch(setBattleShipBoard(board));
      dispatch(setFreeShips(board?.freeElems!));
      dispatch(setCurrentFreeShip(null));
    }
    if (cell.board.isEnemyBoard && roomData.currentPlayer !== secondPlayer) {
      console.log("attack");
      cell.setIsAttacked();
      const isWinner = enemyBoard?.checkWinner()
      const newData = {
        ...roomData,
        [secondPlayer]: {
          ...roomData[secondPlayer],
          cells: mapCellsToFirebase(enemyBoard?.cells!),
          ships: mapShipsToFirebase(enemyBoard?.ships!),
        },
        winner: isWinner ? roomData.currentPlayer : ''
      };
      if (!cell.elem) {
        newData.currentPlayer = secondPlayer;
      }
      setDoc(doc(firestore, "battleship", id!), newData);
    }
  };

  const icon = useMemo(() => {
    if (cell.isAttacked) {
      return cell.elem
        ? { className: "battleship__under-attack", icon: faXmark }
        : { className: "battleship__missed", icon: faCircle };
    }
    return null;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.isAttacked]);

  return (
    <div
      className={`battleship__cell ${
        cell.isAddAvailable ? "battship-highlighted" : ""
      } ${cell.elem && !cell.board.isEnemyBoard ? "with-ship" : ""} ${
        cell.elem?.isDestroyed ? "battleship__destroyed" : ""
      }`}
      onMouseOver={onMouseOver}
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon {...icon} />}
    </div>
  );
};
