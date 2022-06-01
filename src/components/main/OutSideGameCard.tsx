import React, { FC } from "react";
import { gamePics } from "../../utils/gamePicsBuilder";

interface MainPageCardProps {
  gameName: string;
  description?: string;
  pictureName?: string;
  to: string;
}
export const OutSidePageCard: FC<MainPageCardProps> = ({
  gameName,
  pictureName = "default",
  description,
  to,
}) => {
  return (
    <a href={to} className="game-card" target="_blank">
      <div className="game-card__picture">
        <img src={gamePics[pictureName]} alt="Game logo" />
      </div>
      <div className="game-info">
        <h1 className="game-title">{gameName}</h1>
        <p className="game-description">{description}</p>
      </div>
    </a>
  );
};
