import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { gamesCards } from '../constants';
import { useBreadcrumbs } from '../../app/hooks/useBreadcrumbs';
import { useTitle } from '../../hooks/useTitle';
import styles from '../assets/styles/mainpage.module.scss';
import { isMobile } from '../../utils/helpers';
import { GameCard } from '../components/GameCard';

export const MainPage = () => {
  useTitle();
  useBreadcrumbs([]);
  const { t } = useTranslation();

  const filteredGames = useMemo(() => {
    if (isMobile()) {
      return gamesCards.filter((game) => game.mobileSuitable);
    }
    return gamesCards;
  }, []);

  return (
    <div
      className={`container ${styles['main-page__container']}`}
      data-testid="main-page"
    >
      <h2 className={styles['main-page__title']}>{t('main_title')}</h2>
      <div className={styles.games}>
        {filteredGames.map((game) => (
          <GameCard
            key={game.id}
            card={game}
          />
        ))}
      </div>
    </div>
  );
};
