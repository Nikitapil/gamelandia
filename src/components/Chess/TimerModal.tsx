import React, { FC, useState } from "react";

interface TimerModalProps {
  start: (time?: number) => void;
  closeModal: () => void;
}

export const TimerModal: FC<TimerModalProps> = ({ start, closeModal }) => {
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
    <div className="timer-modal">
      <label>
        <input
          type="number"
          className="timer-input"
          placeholder="Time"
          value={time}
          onChange={timeChangeHandler}
        />{" "}
        min
      </label>
      <button className="timer-button" onClick={onStart}>
        Start
      </button>
    </div>
  );
};
