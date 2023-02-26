import React from 'react';
import { SolitaireCardsBlock } from '../../models/Solitaire/SolitaireCardsBlock';
import styles from '../../styles/solitaire.module.scss';
import { SolitaireCardComponent } from './SolitaireCardComponent';
import { SolitaireCard } from '../../models/Solitaire/SolitaireCard';
import { SolitaireEmptyCard } from './SolitaireEmptyCard';

interface SolitaireResultBlockProps {
  block: SolitaireCardsBlock;
  currentCards: SolitaireCard[] | null;
  setCurrentCards: (cards: SolitaireCard[] | null) => void;
  addToResultBlock?: (card: SolitaireCard) => void;
}

export const SolitaireResultBlock = ({
  block,
  currentCards,
  setCurrentCards,
  addToResultBlock
}: SolitaireResultBlockProps) => {
  const clickHandler = (card: SolitaireCard) => {
    setCurrentCards([card]);
  };

  const addToResult = (card: SolitaireCard) => {
    if (addToResultBlock) {
      addToResultBlock(card);
    }
  };

  return (
    <div className={styles.block}>
      {block?.cards.length === 0 && <SolitaireEmptyCard />}
      {block?.cards.map((card) => (
        <div className={styles['block__result-item']} key={card.id}>
          <SolitaireCardComponent
            card={card}
            currentCards={currentCards}
            clickHandler={clickHandler}
            addToResultBlock={addToResult}
          />
        </div>
      ))}
    </div>
  );
};
