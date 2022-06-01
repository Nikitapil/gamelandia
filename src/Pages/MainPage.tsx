import React from "react";
import { MainPageCard } from "../components/main/MainPageCard";
import { OutSidePageCard } from "../components/main/OutSideGameCard";
import { games } from "../constants/games";
import "../styles/mainpage.scss";
export const MainPage = () => {
  return (
    <div className="container main-page__container">
      <h2 className="main-page__title">
        Welcome to Gamelandia! Please choose your game...
      </h2>
      <div className="games">
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
            />
          )
        )}
      </div>
    </div>
  );
};
