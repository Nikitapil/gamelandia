import React, { memo } from 'react';
import back from '../assets/card-images/back.jpeg';
import styles from '../assets/styles/match.module.scss';

interface MatchCardProps {
  onClick: (name: string, id: number) => void;
  flipped: boolean;
  pic: string;
  name: string;
  id: number;
  disabled: boolean;
}

export const MatchCard = memo(({ flipped, pic, name, onClick, id, disabled }: MatchCardProps) => {
  const clickHandler = () => {
    onClick(name, id);
  };

  return (
    <button
      className={`${styles.matchcard} ${flipped ? styles.flipped : ''}`}
      onClick={clickHandler}
      disabled={disabled}
      data-testid="match-card"
      type="button"
    >
      <div className={styles.flipper}>
        <div className={styles.front}>
          <img
            src={back}
            alt="shrek cat"
          />
        </div>
        <div className={styles.back}>
          <img
            src={pic}
            alt="match card"
          />
        </div>
      </div>
    </button>
  );
});
