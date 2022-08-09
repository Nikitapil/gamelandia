import React from "react";
import invadersStyles from "../../styles/invaders.module.scss";
interface InvadersGameOverProps {
  score: number;
  closeModal: () => void;
}

export const InvadersGameOver = ({
  score,
  closeModal,
}: InvadersGameOverProps) => {
  return (
    <div>
      <p className={invadersStyles.gameOver__text}>Your score: {score}</p>
      <button onClick={closeModal} className={invadersStyles.gameOver__btn}>
        Okay
      </button>
    </div>
  );
};
