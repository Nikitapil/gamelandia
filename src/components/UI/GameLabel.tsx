import React, { FC } from "react";

interface GameLabelProps {
  text: string;
}

export const GameLabel: FC<GameLabelProps> = ({ text }) => {
  return <div className="game-label">{text}</div>;
};
