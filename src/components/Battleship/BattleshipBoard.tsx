import { Firestore } from "firebase/firestore";
import React, { FC, memo, useMemo } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { battleShipSelector } from "../../redux/battleships/battleshipSelectors";
import { BattleshipCell } from "./BattleshipCell";
import battlShipStyles from '../../styles/battleship.module.scss'
interface BattleshipBoardProps {
  isEnemy: boolean;
  roomData: any;
  secondPlayer: string;
  firestore: Firestore;
}

export const BattleshipBoard: FC<BattleshipBoardProps> = memo(({
  isEnemy,
  roomData,
  secondPlayer,
  firestore,
}) => {
  const { board, enemyBoard } = useTypedSelector(battleShipSelector);

  const thisBoard = useMemo(() => {
    return isEnemy ? enemyBoard : board;
  }, [isEnemy, board, enemyBoard]);

  return (
    <div className={battlShipStyles.battleship__board}>
      {thisBoard?.cells.map((row) =>
        row.map((cell) => (
          <BattleshipCell
            firestore={firestore}
            secondPlayer={secondPlayer}
            roomData={roomData}
            cell={cell}
            key={cell.id}
          />
        ))
      )}
    </div>
  );
})
