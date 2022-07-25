import React from "react";
import { MainPageCard } from "../components/main/MainPageCard";
import { OutSidePageCard } from "../components/main/OutSideGameCard";
import { games } from "../constants/games";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import mainStyles from "../styles/mainpage.module.scss";
export const MainPage = () => {
  useBreadcrumbs([]);
  return (
    <div
      className={`container ${mainStyles["main-page__container"]}`}
      data-testid="main-page"
    >
      <h2 className={mainStyles["main-page__title"]}>
        Welcome to Gamelandia! Please choose your game...
      </h2>
      <div className={mainStyles.games}>
        {games.map((game) =>
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
