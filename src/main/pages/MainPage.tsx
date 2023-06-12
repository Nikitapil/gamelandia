import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaBars } from 'react-icons/fa';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { EGamesViews, gamesCards } from '../constants';
import { useBreadcrumbs } from '../../app/hooks/useBreadcrumbs';
import { useTitle } from '../../hooks/useTitle';
import styles from '../assets/styles/mainpage.module.scss';
import { isMobile } from '../../utils/helpers';
import { GameCard } from '../components/GameCard';

export const MainPage = () => {
  useTitle();
  useBreadcrumbs([]);
  const { t } = useTranslation();

  const [view, setView] = useState(EGamesViews.PLATE);

  const filteredGames = useMemo(() => {
    if (isMobile()) {
      return gamesCards.filter((game) => game.mobileSuitable);
    }
    return gamesCards;
  }, []);

  const setPlateView = () => setView(EGamesViews.PLATE);
  const setRowsView = () => setView(EGamesViews.ROWS);

  return (
    <div
      className={`container ${styles['main-page__container']}`}
      data-testid="main-page"
    >
      <section className={styles.header}>
        <h2 className={styles['main-page__title']}>{t('main_title')}</h2>
        <div className={styles['views-buttons']}>
          <button
            className={styles['view-button']}
            type="button"
            onClick={setPlateView}
          >
            <BsFillGrid3X3GapFill
              className={view === EGamesViews.PLATE ? styles['active-view'] : ''}
            />
          </button>
          <button
            className={styles['view-button']}
            type="button"
            onClick={setRowsView}
          >
            <FaBars
              className={view === EGamesViews.ROWS ? styles['active-view'] : ''}
              size={21}
            />
          </button>
        </div>
      </section>
      <section className={`${styles.games} ${styles[view]}`}>
        {filteredGames.map((game) => (
          <GameCard
            key={game.id}
            card={game}
          />
        ))}
      </section>
    </div>
  );
};
