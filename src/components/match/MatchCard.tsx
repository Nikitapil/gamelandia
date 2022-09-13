import React, { memo } from 'react';
import back from '../../assets/matchMatch/back.jpeg';
import matchStyles from '../../styles/match.module.scss';

interface MatchCardProps {
  onClick: (name: string, id: number) => void;
  flipped: boolean;
  pic: string;
  name: string;
  id: number;
  disabled: boolean;
}

export const MatchCard = memo(
  ({ flipped, pic, name, onClick, id, disabled }: MatchCardProps) => {
    const clickHandeler = () => {
      onClick(name, id);
    };

    return (
      <button
        className={`${matchStyles.matchcard} ${
          flipped ? matchStyles.flipped : ''
        }`}
        onClick={clickHandeler}
        disabled={disabled}
        data-testid="match-card"
        type="button"
      >
        <div className={matchStyles.flipper}>
          <div className={matchStyles.front}>
            <img src={back} alt="shrek cat" />
          </div>
          <div className={matchStyles.back}>
            <img src={pic} alt="shrek cat" />
          </div>
        </div>
      </button>
    );
  }
);
