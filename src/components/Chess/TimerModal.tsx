import React, { FC, memo, useState } from "react";

interface TimerModalProps {
  start: (time: number) => void;
  closeModal: () => void;
}

export const TimerModal: FC<TimerModalProps> = memo(({ start, closeModal }) => {
  const [time, setTime] = useState(60);

  const timeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTime(+value);
  };

  const onStart = () => {
    const timeValue = time > 10 ? time : 10;
    const seconds = timeValue * 60;
    start(seconds);
    closeModal();
  };

  return (
    <div className="timer-modal" data-testid='timer-modal'>
      <label>
        <input
          type="number"
          className="timer-input"
          placeholder="Time"
          value={time}
          onChange={timeChangeHandler}
          data-testid='time-input'
        />{" "}
        min
      </label>
      <button className="timer-button" onClick={onStart} data-testid='chess-start-button'>
        Start
      </button>
    </div>
  );
});
