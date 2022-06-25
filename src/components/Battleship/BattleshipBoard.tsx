import { Firestore } from "firebase/firestore";
import React, { FC, useMemo } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { battleShipSelector } from "../../redux/battleships/battleshipSelectors";
import { BattleshipCell } from "./BattleshipCell";

interface BattleshipBoardProps {
  isEnemy: boolean;
  roomData: any;
  secondPlayer: string;
  firestore: Firestore;
}

export const BattleshipBoard: FC<BattleshipBoardProps> = ({
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
    <div className="battleship__board">
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
};
