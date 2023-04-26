import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MainPageCard } from '../components/main/MainPageCard';
import { OutSidePageCard } from '../components/main/OutSideGameCard';
import { games } from '../constants/games';
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import { useTitle } from '../hooks/useTitle';
import mainStyles from '../styles/mainpage.module.scss';
import { isMobile } from '../utils/helpers';

export const MainPage = () => {
  useTitle();
  useBreadcrumbs([]);
  const { t } = useTranslation();

  const filteredGames = useMemo(() => {
    if (isMobile()) {
      return games.filter((game) => game.mobileSuitable);
    }
    return games;
  }, []);

  return (
    <div
      className={`container ${mainStyles['main-page__container']}`}
      data-testid="main-page"
    >
      <h2 className={mainStyles['main-page__title']}>{t('main_title')}</h2>
      <div className={mainStyles.games}>
        {filteredGames.map((game) =>
          game.isOutside ? (
            <OutSidePageCard
              key={game.id}
              gameName={game.gameName}
              description={game.description}
              pictureName={game.pictureName}
              to={game.path}
            />
          ) : (
            <MainPageCard
              key={game.id}
              gameName={game.gameName}
              description={game.description}
              pictureName={game.pictureName}
              to={game.path}
              labels={game.labels}
            />
          )
        )}
      </div>
    </div>
  );
};
