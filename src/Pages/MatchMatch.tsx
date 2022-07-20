import React, { useEffect, useState } from "react";
import { MatchCard } from "../components/match/MatchCard";
import { card } from "../domain/matchMatch";
import { matchMatchPics } from "../utils/gamePicsBuilder";
import { getuniqArrayObjects, shuffleArray } from "../utils/helpers";
import matchStyles from '../styles/match.module.scss'
export const MatchMatch = () => {
  const [cards, setCards] = useState<card[]>([]);
  const [currentOpened, setCurrentOpened] = useState<card | null>(null);
  const [isWin, setIsWin] = useState(false);
  const [isLoose, setIsLoose] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const revertCard = (id: number, idSecond?: number) => {
    setCards(
      cards.map((item, index) => {
        if (index === id || index === idSecond) {
          item.flipped = !item.flipped;
          if (item.flipped) {
            item.disabled = true;
          } else {
            item.disabled = false;
          }
        }
        return item;
      })
    );
  };

  const checkFinish = () => {
    if (cards.every((card) => card.flipped)) {
      setIsWin(true);
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
      setAttempts(attempts + 1);
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

  useEffect(() => {
    if (!isWin && !isLoose) {
      const arr = getuniqArrayObjects(
        shuffleArray([...matchMatchPics, ...matchMatchPics])
      );
      setCards(arr);
    }
  }, [isWin, isLoose]);

  useEffect(() => {
    if (attempts > 25) {
      setIsLoose(true);
    }
  }, [attempts]);

  return (
    <div className={`${matchStyles.match} container`}>
      <h1 className={matchStyles.match__title}>Match-Match Game</h1>
      <p className={matchStyles.match__description}>
        Just click on cards and find the same.
      </p>
      <p className={matchStyles.match__description}>
        {" "}
        Attempts: <span className={matchStyles.attempts_counter}>{attempts}/25</span>
      </p>
      {isWin && (
        <p className={matchStyles.match__win}>
          You Win!!!{" "}
          <button className={matchStyles['match__new-game']} onClick={newGame}>
            New Game
          </button>
        </p>
      )}
      {isLoose && (
        <p className={matchStyles.match__loose}>
          You Loose{" "}
          <button className={matchStyles['match__new-game']} onClick={newGame}>
            New Game
          </button>
        </p>
      )}
      <div className={matchStyles.match__cards}>
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
