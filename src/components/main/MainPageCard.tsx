import React, { FC } from "react";
import { Link } from "react-router-dom";
import { gamePics } from "../../utils/gamePicsBuilder";

interface MainPageCardProps {
  gameName: string;
  description?: string;
  pictureName?: string;
  to: string;
}
export const MainPageCard: FC<MainPageCardProps> = ({
  gameName,
  pictureName = "default",
  description,
  to,
}) => {
  return (
    <Link to={to} className="game-card">
      <div className="game-card__picture">
        <img src={gamePics[pictureName]} alt="Game logo" />
      </div>
      <div className="game-info">
        <h1 className="game-title">{gameName}</h1>
        <p className="game-description">{description}</p>
      </div>
    </Link>
  );
};
