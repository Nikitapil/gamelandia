import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { gamePics } from '../../utils/gamePicsBuilder';
import { GameLabel } from '../UI/GameLabel';
import mainStyles from '../../styles/mainpage.module.scss';

interface MainPageCardProps {
  gameName: string;
  description: string;
  pictureName?: string;
  to: string;
  labels: string[];
}
export const MainPageCard: FC<MainPageCardProps> = ({
  gameName,
  pictureName = 'default',
  description,
  to,
  labels
}) => {
  const { t } = useTranslation();

  return (
    <Link to={to} className={mainStyles['game-card']}>
      <div className={mainStyles['game-card__picture']}>
        <img
          data-testid="game-pic"
          src={gamePics[pictureName]}
          alt="Game logo"
        />
      </div>
      <div className={mainStyles['game-info']}>
        <h1 className={mainStyles['game-title']}>{t(gameName)}</h1>
        <p className={mainStyles['game-description']}>{t(description)}</p>
        <div className={mainStyles.labeles__container}>
          {labels.map((label) => (
            <GameLabel key={Math.random()} text={label} />
          ))}
        </div>
      </div>
    </Link>
  );
};
