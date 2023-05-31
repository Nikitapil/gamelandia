import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { GameLabel } from './GameLabel';
import styles from '../assets/styles/mainpage.module.scss';
import { gamePics } from '../constants';
import { IGameCard } from '../types';

interface IInternalGameCardProps {
  card: IGameCard;
}
export const InternalGameCard: FC<IInternalGameCardProps> = ({ card }) => {
  const { t } = useTranslation();

  return (
    <Link
      to={card.path}
      className={styles['game-card']}
    >
      <div className={styles['game-card__picture']}>
        <img
          data-testid="game-pic"
          src={gamePics[card.pictureName]}
          alt="Game logo"
        />
      </div>
      <div className={styles['game-info']}>
        <h1 className={styles['game-title']}>{t(card.gameName)}</h1>
        <p className={styles['game-description']}>{t(card.description)}</p>
        <div className={styles.labeles__container}>
          {card.labels.map((label) => (
            <GameLabel
              key={uuidv4()}
              text={label}
            />
          ))}
        </div>
      </div>
    </Link>
  );
};
