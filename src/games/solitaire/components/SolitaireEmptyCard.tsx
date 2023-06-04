import React from 'react';
import { FaBan } from 'react-icons/fa';
import styles from '../assets/styles/solitaire.module.scss';

interface SolitaireEmptyCardProps {
  clickHandler?: () => void;
}

export const SolitaireEmptyCard = ({ clickHandler }: SolitaireEmptyCardProps) => {
  const onClick = () => {
    if (clickHandler) {
      clickHandler();
    }
  };

  return (
    <div
      className={`${styles.card} ${styles.card__empty}`}
      onClick={onClick}
    >
      <FaBan />
    </div>
  );
};
