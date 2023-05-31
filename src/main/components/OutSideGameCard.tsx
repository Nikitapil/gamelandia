import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import style from '../assets/styles/mainpage.module.scss';
import { gamePics } from '../constants';
import { IGameCard } from '../types';

interface IOutSideGameCard {
  card: IGameCard;
}
export const OutSideGameCard: FC<IOutSideGameCard> = ({ card }) => {
  const { t } = useTranslation();

  return (
    <a
      href={card.path}
      className={style['game-card']}
      target="_blank"
      rel="noreferrer"
    >
      <div className={style['game-card__picture']}>
        <img
          data-testid="game-pic"
          src={gamePics[card.pictureName]}
          alt="Game logo"
        />
      </div>
      <div className={style['game-info']}>
        <h1 className={style['game-title']}>{t(card.gameName)}</h1>
        <p className={style['game-description']}>{t(card.description)}</p>
      </div>
    </a>
  );
};
