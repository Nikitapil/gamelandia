import React from 'react';
import styles from '../assets/styles/solitaire.module.scss';
import { SolitaireCardsBlock } from '../models/SolitaireCardsBlock';
import { SolitaireCardComponent } from './SolitaireCardComponent';
import { SolitaireCard } from '../models/SolitaireCard';
import { SolitaireEmptyCard } from './SolitaireEmptyCard';

interface SolitaireCardsBlockComponentProps {
  block: SolitaireCardsBlock;
  currentCards: SolitaireCard[] | null;
  setCurrentCards: (cards: SolitaireCard[] | null) => void;
  changeBlockForCards: (block: SolitaireCardsBlock) => void;
  addToResultBlock: (card: SolitaireCard) => void;
}

export const SolitaireCardsBlockComponent = ({
  block,
  currentCards,
  setCurrentCards,
  changeBlockForCards,
  addToResultBlock
}: SolitaireCardsBlockComponentProps) => {
  const clickHandler = (card?: SolitaireCard) => {
    if (!currentCards && block.cards.length) {
      const cardIndex = block.cards.findIndex((c) => c === card);
      setCurrentCards(block.cards.slice(cardIndex));
    } else {
      changeBlockForCards(block);
    }
  };

  return (
    <div className={styles.block}>
      {block?.cards.length === 0 && <SolitaireEmptyCard clickHandler={clickHandler} />}
      {block?.cards?.map((card) => (
        <div
          className={styles.block__item}
          key={card.id}
        >
          <SolitaireCardComponent
            key={card.id}
            card={card}
            currentCards={currentCards}
            clickHandler={clickHandler}
            addToResultBlock={addToResultBlock}
          />
        </div>
      ))}
    </div>
  );
};
