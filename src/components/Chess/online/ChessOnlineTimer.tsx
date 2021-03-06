import React, { FC, memo, useEffect, useRef } from "react";
import { IChessTime } from "../../../domain/chessTypes";
import { Colors } from "../../../models/chess/Colors";
import { Player } from "../../../models/chess/Player";

interface ChessOnlineTimerProps {
  time : IChessTime
  setTime : (time: IChessTime) => void;
  currentPlayer: Player | null
  endGame: () => void;
}

export const ChessOnlineTimer: FC<ChessOnlineTimerProps> = memo(({
  time, 
  currentPlayer,
  endGame,
  setTime
}) => {
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  const decrementBlackTimer = () => {
    if (time.black <= 0) {
        endGame()
      clearInterval(timer.current!);
    }
    setTime({...time, black: time.black - 1});
  };

  const decrementWhiteTimer = () => {
      if (time.white <= 0) {
        endGame()
        clearInterval(timer.current!);
      }
      setTime({...time, white: time.white - 1});
  };

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

  

  useEffect(() => {
    startTimer()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer, time])

  return (
    <div>
      <div className="chess-timer__time">
        <div className="chess-timer__item">
          Black - <div className="time">{(time.black / 60).toFixed(0)}m</div>
        </div>
        <div className="chess-timer__item">
          White - <div className="time">{(time.white / 60).toFixed(0)}m</div>
        </div>
      </div>
    </div>
  );
})
