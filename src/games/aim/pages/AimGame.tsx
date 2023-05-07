import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useTranslation } from 'react-i18next';
import { useBreadcrumbs } from '../../../app/hooks/useBreadcrumbs';
import { breadcrumbs } from '../../../constants/breadcrumbs';
import { useTitle } from '../../../hooks/useTitle';
import styles from '../assets/styles/aimgame.module.scss';
import { Aim } from '../components/Aim';
import { AimModel } from '../models/AimModel';
import { AppButton } from '../../../components/UI/AppButton/AppButton';
import { CommonScoreBoard } from '../../../score/components/CommonScoreBoard';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { authSelector } from '../../../store/selectors';
import { useCreateScore } from '../../../score/hooks/useCreateScore';
import { EGamesNames } from '../../constants';

export const AimGame = () => {
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.aim]);
  useTitle('Aim Game');
  const { t } = useTranslation();
  const [aimDot, setAimDot] = useState(new AimModel());
  const [score, setScore] = useState(0);
  const [remainingTime, setReamainingTime] = useState(30);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);
  const { user } = useAppSelector(authSelector);
  const createScore = useCreateScore();

  const updateDot = useCallback(() => {
    if (isGameFinished) {
      return;
    }
    if (!isGameStarted) {
      setIsGameStarted(true);
      timer.current = setInterval(() => {
        setReamainingTime((prev) => prev - 1);
      }, 1000);
    }
    setScore((prev) => prev + 1);
    setAimDot(new AimModel());
  }, [isGameStarted, remainingTime, isGameFinished]);

  const newGame = () => {
    setIsGameStarted(false);
    setReamainingTime(30);
    setIsGameFinished(false);
    setAimDot(new AimModel());
    setScore(0);
  };

  const finishClass = useMemo(() => {
    if (isGameFinished) {
      return styles.finished;
    }
    return '';
  }, [isGameFinished]);

  const updateScore = async () => {
    await createScore({
      value: score,
      gameName: EGamesNames.AIM
    });
  };

  useEffect(() => {
    if (remainingTime === 0) {
      clearInterval(timer.current!);
      timer.current = null;
      setIsGameFinished(true);
      updateScore();
    }
  }, [remainingTime]);

  return (
    <div className={`container ${styles['aim-game']}`} data-testid="aim-page">
      <h2 className="page-title">Aim Game</h2>
      <div className={styles['game-controlls']}>
        <div className={finishClass} data-testId="aim-score">
          {t('score')}: {score}
        </div>
        <div className={finishClass}>
          {t('remaining_time')}: {remainingTime}
        </div>
        {isGameFinished && (
          <AppButton
            text={t('new_game')}
            color="success"
            onClick={newGame}
            size="sm"
            testId="new-aim"
          />
        )}
      </div>
      <div className={styles['fields-container']}>
        <div className={styles.field}>
          <Aim aimDot={aimDot} updateDot={updateDot} />
        </div>
        <CommonScoreBoard user={user} game={EGamesNames.AIM} />
      </div>
    </div>
  );
};
