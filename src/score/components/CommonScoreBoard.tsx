import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../assets/styles/scores.module.scss';
import { ScoreTableLoader } from './ScoreTableLoader';
import { IUser } from '../../auth/types';
import { useAppSelector } from '../../hooks/useAppSelector';
import { scoreSelector } from '../../store/selectors';
import { useScoreActions } from '../hooks/useScoreActions';
import { AppRadioButton } from '../../components/UI/AppRadioButton/AppRadioButton';
import { scoreLevelOptions } from '../constants';
import { EGamesLevels, EGamesNames } from '../../games/constants';
import { Score } from './Score';

interface CommonScoreBoardProps {
  game: EGamesNames;
  user: IUser | null;
}

export const CommonScoreBoard = ({ game, user }: CommonScoreBoardProps) => {
  const { t } = useTranslation();
  const [currentLevel, setCurrentLevel] = useState(EGamesLevels.EASY);

  const { scores, isLoading, withLevels } = useAppSelector(scoreSelector);
  const { getScore } = useScoreActions();

  useEffect(() => {
    getScore(game);
  }, [game, getScore]);

  const scoresToShow = useMemo(() => {
    if (withLevels) {
      return scores.filter((score) => score.level === currentLevel);
    }
    return scores;
  }, [currentLevel, scores, withLevels]);

  if (isLoading) {
    return (
      <div className={styles['score-board']}>
        <ScoreTableLoader />
      </div>
    );
  }

  return (
    <div className={styles['score-board']}>
      <h3 className={styles['score-board__title']}>{t('scores')}</h3>
      {withLevels && (
        <div className="mb-m">
          <AppRadioButton
            options={scoreLevelOptions}
            value={currentLevel}
            setValue={setCurrentLevel}
          />
        </div>
      )}
      {scoresToShow?.map((score) => (
        <Score
          key={score.id}
          score={score}
          isMyScore={score.userId === user?.id}
        />
      ))}
    </div>
  );
};
