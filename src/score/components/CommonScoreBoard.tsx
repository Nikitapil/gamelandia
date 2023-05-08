import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import commonStyles from '../../styles/common.module.scss';
import { ScoreTableLoader } from './ScoreTableLoader';
import { IUser } from '../../auth/types';
import { useAppSelector } from '../../hooks/useAppSelector';
import { scoreSelector } from '../../store/selectors';
import { useScoreActions } from '../hooks/useScoreActions';
import { AppRadioButton } from '../../components/UI/AppRadioButton/AppRadioButton';
import { scoreLevelOptions } from '../constants';
import { EGamesLevels, EGamesNames } from '../../games/constants';

interface CommonScoreBoardProps {
  game: EGamesNames;
  user: IUser | null;
}

export const CommonScoreBoard = ({ game, user }: CommonScoreBoardProps) => {
  const [currentLevel, setCurrentLevel] = useState(EGamesLevels.EASY);
  const { scores, isLoading, withLevels } = useAppSelector(scoreSelector);
  const { getScore } = useScoreActions();
  const { t } = useTranslation();

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
    return <ScoreTableLoader />;
  }

  return (
    <div className={commonStyles['score-board']}>
      <h3 className={commonStyles['score-board__title']}>{t('scores')}</h3>
      {withLevels && (
        <div className="mb-m">
          <AppRadioButton
            options={scoreLevelOptions}
            value={currentLevel}
            setValue={setCurrentLevel}
          />
        </div>
      )}
      {scoresToShow?.map((score) => {
        return (
          <p
            className={`${commonStyles['score-board_value']} ${
              user?.id === score?.userId ? commonStyles['my-score'] : ''
            }`}
            key={uuidv4()}
          >
            <span>{score.User?.username || 'Unknown'}</span>
            <span>{score.value}</span>
          </p>
        );
      })}
    </div>
  );
};
