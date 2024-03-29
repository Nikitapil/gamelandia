import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useProfileActions } from '../hooks/useProfileActions';
import { useAppSelector } from '../../hooks/useAppSelector';
import { statisticsSelector } from '../../store/selectors';
import { RoundLoader } from '../../components/UI/Loaders/RoundLoader';
import { ProfileStatisticsCard } from '../components/ProfileStatisticsCard';
import styles from '../assets/styles/profile.module.scss';

export const ProfileStatistics = () => {
  const { t } = useTranslation();

  const { getGameStatistics } = useProfileActions();
  const { isLoading, gameStatistics } = useAppSelector(statisticsSelector);

  useEffect(() => {
    getGameStatistics();
  }, [getGameStatistics]);

  if (isLoading) {
    return (
      <div className="container">
        <RoundLoader />
      </div>
    );
  }

  return (
    <div className={styles.statistics}>
      <h3 className={styles.statistics__title}>{t('games_statistics')}</h3>
      {gameStatistics.map((game) => (
        <ProfileStatisticsCard
          key={game.name}
          statisticsItem={game}
        />
      ))}
    </div>
  );
};
