import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppButton } from '../UI/AppButton';

interface TimerModalProps {
  start: (time: number) => void;
  closeModal: () => void;
}

export const TimerModal = memo(({ start, closeModal }: TimerModalProps) => {
  const [time, setTime] = useState(60);
  const { t } = useTranslation();
  const timeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTime(+value);
  };

  const onStart = () => {
    const timeValue = time > 10 ? time : 10;
    const seconds = timeValue * 60;
    start(seconds);
    closeModal();
  };

  return (
    <div className="timer-modal" data-testid="timer-modal">
      <label htmlFor="time-input">
        <input
          type="number"
          className="timer-input"
          placeholder="Time"
          value={time}
          onChange={timeChangeHandler}
          data-testid="time-input"
          id="time-input"
        />{' '}
        {t('min')}
      </label>
      <AppButton
        color="dark"
        onClick={onStart}
        testId="chess-start-button"
        type="button"
      >
        {t('start_game')}
      </AppButton>
    </div>
  );
});
