import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { GameLabel } from '../../components/UI/GameLabel';
import mainStyles from '../assets/styles/mainpage.module.scss';
import { gamePics } from '../constants';

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
            <GameLabel key={uuidv4()} text={label} />
          ))}
        </div>
      </div>
    </Link>
  );
};
