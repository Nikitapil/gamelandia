import React, { FC, useMemo } from "react";
import { ModalContainer } from "../UI/ModalContainer";

interface WinnerModalProps {
  color: string;
  newGame: () => void;
}

export const WinnerModal: FC<WinnerModalProps> = ({ color, newGame }) => {
  const winner = useMemo(() => {
    return color.toUpperCase();
  }, [color]);

  return (
    <ModalContainer title={winner + " WINS"} closeModal={newGame}>
      <button className="chess__new-game" onClick={newGame}>
        New Game
      </button>
    </ModalContainer>
  );
};
