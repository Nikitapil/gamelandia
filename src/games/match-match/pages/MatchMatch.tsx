/* eslint-disable react/no-array-index-key */
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MatchCard } from '../components/MatchCard';
import { ICard } from '../types';
import { getUniqArrayObjects, shuffleArray } from '../../../utils/helpers';
import styles from '../assets/styles/match.module.scss';
import { useBreadcrumbs } from '../../../app/hooks/useBreadcrumbs';
import { breadcrumbs } from '../../../constants/breadcrumbs';
import { useTitle } from '../../../hooks/useTitle';
import { AppButton } from '../../../components/UI/AppButton/AppButton';
import { matchMatchPics } from '../constants';
import { useUpdateWinsCount } from '../../../wins-count/hooks/useUpdateWinsCount';
import { EGamesNames } from '../../constants';
import { GameTitleWithWinners } from '../../components/GameTitleWithWinners';

export const MatchMatch = () => {
  const { t } = useTranslation();
  useTitle('Match game');
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.matchGame]);

  const [cards, setCards] = useState<ICard[]>([]);
  const [currentOpened, setCurrentOpened] = useState<ICard | null>(null);
  const [isWin, setIsWin] = useState(false);
  const [isLoose, setIsLoose] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const updateWinsCount = useUpdateWinsCount();

  const revertCard = (id: number, idSecond?: number) => {
    setCards(
      cards.map((item, index) => {
        if (index === id || index === idSecond) {
          item.flipped = !item.flipped;
          item.disabled = item.flipped;
        }
        return item;
      })
    );
  };

  const checkFinish = () => {
    if (isWin || isLoose) {
      return;
    }
    if (attempts >= 25) {
      setIsLoose(true);
      return;
    }
    if (cards.every((card) => card.flipped)) {
      setIsWin(true);
      updateWinsCount({
        gameName: EGamesNames.MATCH
      });
    }
  };

  const disableAll = () => {
    setCards(
      cards.map((item) => {
        if (!item.flipped) {
          item.disabled = !item.disabled;
        }
        return item;
      })
    );
  };

  const openCard = (name: string, id: number) => {
    revertCard(id);
    disableAll();
    const card = cards[id];
    if (currentOpened) {
      setAttempts((prev) => prev + 1);
      if (card.name === currentOpened.name) {
        setCurrentOpened(null);
        disableAll();
      } else {
        setTimeout(() => {
          disableAll();
          const currentIndex = cards.indexOf(currentOpened);
          revertCard(id, currentIndex);
          setCurrentOpened(null);
        }, 1500);
      }
    } else {
      setCurrentOpened(card);
      disableAll();
    }
    checkFinish();
  };

  const newGame = () => {
    setAttempts(0);
    setIsWin(false);
    setIsLoose(false);
  };

  const finalGameAttrs = useMemo(() => {
    if (!isWin && !isLoose) {
      return null;
    }
    const classname = isWin ? styles.match__win : styles.match__loose;
    const text = isWin ? t('you_win') : t('you_loose');
    return { classname, text };
  }, [isLoose, isWin, t]);

  useEffect(() => {
    if (!isWin && !isLoose) {
      const arr = getUniqArrayObjects(shuffleArray([...matchMatchPics, ...matchMatchPics]));
      setCards(arr);
    }
  }, [isWin, isLoose]);

  return (
    <div className="game-page-container container">
      <GameTitleWithWinners
        title="Match-Match Game"
        gameName={EGamesNames.MATCH}
      />
      <p className={styles.match__description}>{t('match_page_description')}</p>
      <p className={styles.match__description}>
        {t('attempts')}:<span className={styles.attempts_counter}> {attempts}/25</span>
      </p>
      {finalGameAttrs && (
        <p className={finalGameAttrs.classname}>
          {finalGameAttrs.text}
          <AppButton
            onClick={newGame}
            type="button"
          >
            {t('new_game')}
          </AppButton>
        </p>
      )}
      <div className={styles.match__cards}>
        {cards.map((card, idx) => {
          return (
            <MatchCard
              name={card.name}
              flipped={card.flipped}
              pic={card.pic}
              onClick={openCard}
              key={idx}
              id={idx}
              disabled={card.disabled || isLoose}
            />
          );
        })}
      </div>
    </div>
  );
};
