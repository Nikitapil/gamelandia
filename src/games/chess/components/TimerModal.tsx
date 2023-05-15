import { ChangeEvent, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppButton } from '../../../components/UI/AppButton/AppButton';
import styles from '../assets/styles/chess.module.scss';

interface ITimerModalProps {
  start: (time: number) => void;
  closeModal: () => void;
}

export const TimerModal = memo(({ start, closeModal }: ITimerModalProps) => {
  const { t } = useTranslation();

  const [time, setTime] = useState(60);

  const timeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
    <div
      className={styles['timer-modal']}
      data-testid="timer-modal"
    >
      <label htmlFor="time-input">
        <input
          type="number"
          className={styles['timer-input']}
          placeholder="Time"
          value={time}
          onChange={timeChangeHandler}
          data-testid="time-input"
          id="time-input"
        />
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
