import React, { FC, useEffect, useRef, useState } from "react";
import { Colors } from "../../models/chess/Colors";
import { Player } from "../../models/chess/Player";
import { ModalContainer } from "../UI/ModalContainer";
import { TimerModal } from "./TimerModal";

interface ChessTimerProps {
  currentPlayer: Player | null;
  restart: () => void;
  endGame: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (bool:boolean) => void;
  setWinner: (color:Colors) => void;
}

export const ChessTimer: FC<ChessTimerProps> = ({
  currentPlayer,
  restart,
  isModalOpen,
  setIsModalOpen,
  setWinner
}) => {
  const [blackTime, setBlackTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const startTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const callback =
      currentPlayer?.color === Colors.WHITE
        ? decrementWhiteTimer
        : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
  };

  const decrementBlackTimer = () => {
    if (blackTime <= 0) {
      setWinner(Colors.WHITE)
      clearInterval(timer.current!);
    }
    setBlackTime((prev) => prev - 1);
  };

  const decrementWhiteTimer = () => {
      if (whiteTime <= 0) {
        setWinner(Colors.BLACK)
        clearInterval(timer.current!);
      }
    setWhiteTime((prev) => prev - 1);
  };

  useEffect(() => {
    startTimer();
  }, [currentPlayer, startTimer]);

  useEffect(() => {
    if (whiteTime <= 0) {
        if (timer.current) {
            clearInterval(timer.current);
          }
          setWinner(Colors.BLACK)
    }
    if (blackTime <= 0) {
        if (timer.current) {
            clearInterval(timer.current);
          }
          setWinner(Colors.WHITE)
    }
    
  }, [whiteTime, blackTime, setWinner])

  const handleRestart = (time: number = 300) => {
    setBlackTime(time);
    setWhiteTime(time);
    restart();
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className="chess__restart" data-testid='chess__restart'>
        Restart game
      </button>
      <div className="chess-timer__time">
        <div className="chess-timer__item">
          Black - <div className="time">{(blackTime / 60).toFixed(0)}m</div>
        </div>
        <div className="chess-timer__item">
          {" "}
          White - <div className="time">{(whiteTime / 60).toFixed(0)}m</div>
        </div>
      </div>
      {isModalOpen && (
        <ModalContainer
          closeModal={() => handleRestart(3600)}
          title="Set time of the Game"
        >
          <TimerModal closeModal={closeModal} start={handleRestart} />
        </ModalContainer>
      )}
    </div>
  );
};
