import React, { FC } from "react";
import { Link } from "react-router-dom";
import { gamePics } from "../../utils/gamePicsBuilder";
import { GameLabel } from "../UI/GameLabel";

interface MainPageCardProps {
  gameName: string;
  description?: string;
  pictureName?: string;
  to: string;
  labels: string[];
}
export const MainPageCard: FC<MainPageCardProps> = ({
  gameName,
  pictureName = "default",
  description,
  to,
  labels,
}) => {
  return (
    <Link to={to} className="game-card">
      <div className="game-card__picture">
        <img
          data-testid="game-pic"
          src={gamePics[pictureName]}
          alt="Game logo"
        />
      </div>
      <div className="game-info">
        <h1 className="game-title">{gameName}</h1>
        <p className="game-description">{description}</p>
        <div className="labeles__container">
          {labels.map((label, index) => (
            <GameLabel key={index} text={label} />
          ))}
        </div>
      </div>
    </Link>
  );
};