import React, { FC } from "react";
import back from "../../assets/matchMatch/back.jpeg";

interface MatchCardProps {
  onClick: (name: string, id: number) => void;
  flipped: boolean;
  pic: string;
  name: string;
  id: number;
  disabled: boolean;
}

export const MatchCard: FC<MatchCardProps> = ({
  flipped,
  pic,
  name,
  onClick,
  id,
  disabled,
}) => {
  const clickHandeler = () => {
    onClick(name, id);
  };

  return (
    <button
      className={`matchcard ${flipped ? "flipped" : ""}`}
      onClick={clickHandeler}
      disabled={disabled}
      data-testid='match-card'
    >
      <div className="flipper">
        <div className="front">
          <img src={back} alt="shrek cat" />
        </div>
        <div className="back">
          <img src={pic} alt="shrek cat" />
        </div>
      </div>
    </button>
  );
};
