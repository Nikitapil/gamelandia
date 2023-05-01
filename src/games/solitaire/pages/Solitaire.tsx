import React, { useEffect, useState } from 'react';
import * as uuid from 'uuid';
import { useTranslation } from 'react-i18next';
import { SolitaireGame } from '../models/SolitaireGame';
import styles from '../assets/styles/solitaire.module.scss';
import { SolitaireCardsBlockComponent } from '../components/SolitaireCardsBlockComponent';
import { SolitaireCard } from '../models/SolitaireCard';
import { SolitaireCardsBlock } from '../models/SolitaireCardsBlock';
import { SolitaireResultBlock } from '../components/SolitaireResultBlock';
import { AppButton } from '../../../components/UI/AppButton';
import { useTitle } from '../../../hooks/useTitle';
import { useBreadcrumbs } from '../../../hooks/useBreadcrumbs';
import { breadcrumbs } from '../../../constants/breadcrumbs';

export const Solitaire = () => {
  const { t } = useTranslation();
  useTitle(t('solitaire'));
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.solitaire]);
  const [game, setGame] = useState<SolitaireGame | null>(null);
  const [key, setKey] = useState(uuid.v4());
  const [isWin, setIsWin] = useState(false);
  const [currentCards, setCurrentCards] = useState<SolitaireCard[] | null>(
    null
  );

  const startGame = () => {
    setIsWin(false);
    const newGame = new SolitaireGame();
    newGame.startGame();
    setGame(newGame);
  };

  const changeBlock = (block: SolitaireCardsBlock) => {
    if (currentCards) {
      game?.changeBlockForCards(block, currentCards);
      setCurrentCards(null);
    }
  };

  const addToResultBlock = (card: SolitaireCard) => {
    game?.addToResultBlock(card);
    setKey(uuid.v4());
    setCurrentCards(null);
    const isWinner = game?.checkWinner();
    if (isWinner) {
      setIsWin(true);
    }
  };

  const swapCardsInDec = () => {
    setCurrentCards(null);
    game?.swapCardsInDeck();
    setKey(uuid.v4());
  };

  useEffect(() => {
    startGame();
  }, []);

  return (
    <div key={key} className={`container ${styles.solitaire}`}>
      <h1 className="page-title">Solitaire</h1>
      <div className={styles.win}>
        {isWin && <p className={styles.win__text}>{t('you_win')}!!!</p>}
        <AppButton
          text={t('new_game')}
          color="success"
          onClick={startGame}
          customClass="mb-m"
        />
      </div>
      <div className={styles.field}>
        <div className={styles.field__top}>
          <div className={styles.deck}>
            <div
              className={`${styles.card} ${styles.card__closed}`}
              onClick={swapCardsInDec}
            />
            {game?.deck && (
              <SolitaireResultBlock
                block={game.deck}
                currentCards={currentCards}
                setCurrentCards={setCurrentCards}
                addToResultBlock={addToResultBlock}
              />
            )}
          </div>
          <div className={styles.deck}>
            {game?.resultBlocks.map((block) => (
              <SolitaireResultBlock
                key={block.id}
                block={block}
                currentCards={currentCards}
                setCurrentCards={setCurrentCards}
              />
            ))}
          </div>
        </div>
        <div className={styles.field__main}>
          {game?.fieldBlocks.map((block) => (
            <SolitaireCardsBlockComponent
              key={block.id}
              block={block}
              currentCards={currentCards}
              setCurrentCards={setCurrentCards}
              changeBlockForCards={changeBlock}
              addToResultBlock={addToResultBlock}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
