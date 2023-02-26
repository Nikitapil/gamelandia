import React, { useMemo } from 'react';
import styles from '../../styles/solitaire.module.scss';
import { SolitaireCard } from '../../models/Solitaire/SolitaireCard';
import { SolitaireCardIcon } from './SolitaireCardIcon';

interface SolitaireCardComponentProps {
  card: SolitaireCard;
  currentCards: SolitaireCard[] | null;
  clickHandler: (card: SolitaireCard) => void;
  addToResultBlock: (card: SolitaireCard) => void;
}

export const SolitaireCardComponent = ({
  card,
  currentCards,
  clickHandler,
  addToResultBlock
}: SolitaireCardComponentProps) => {
  const className = useMemo(() => {
    if (!card.isOpened) {
      return `${styles.card} ${styles.card__closed}`;
    }
    if (currentCards) {
      if (currentCards.includes(card)) {
        return `${styles.card} ${styles.card__choosen}`;
      }
    }
    return styles.card;
  }, [currentCards, card]);

  const onClick = () => {
    if (!currentCards && !card.isOpened) {
      return;
    }
    clickHandler(card);
  };

  const addToResult = () => {
    addToResultBlock(card);
  };

  return (
    <div className={className} onClick={onClick} onDoubleClick={addToResult}>
      {card.isOpened && (
        <>
          <div className={styles.card__title}>
            <p style={{ color: card.color }}>{card.name}</p>
            <SolitaireCardIcon suit={card.suit} color={card.color} />
          </div>
          <div className={styles.card__icon}>
            <SolitaireCardIcon suit={card.suit} color={card.color} />
          </div>
          <div className={styles.card__bottom}>
            <p style={{ color: card.color }}>{card.name}</p>
            <SolitaireCardIcon suit={card.suit} color={card.color} />
          </div>
        </>
      )}
    </div>
  );
};
