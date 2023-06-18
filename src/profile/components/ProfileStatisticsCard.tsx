import React from 'react';
import { useTranslation } from 'react-i18next';
import { IGameStatistics } from '../types';
import styles from '../assets/styles/profile.module.scss';

interface IProfileStatisticsCardProps {
  statisticsItem: IGameStatistics;
}

export const ProfileStatisticsCard = ({ statisticsItem }: IProfileStatisticsCardProps) => {
  const { t } = useTranslation();
  return (
    <div className={styles['statistics-card']}>
      <h3 className={styles['statistics-card__title']}>{t(statisticsItem.name)}</h3>
      <div className={styles['statistics-card__info']}>
        {statisticsItem.score && (
          <p>
            {t('your_best_score')}: <span>{statisticsItem.score.value}</span>
          </p>
        )}
        {statisticsItem.winsCount && (
          <p>
            {t('your_wins_count')}: <span>{statisticsItem.winsCount.value}</span>
          </p>
        )}
      </div>
    </div>
  );
};
