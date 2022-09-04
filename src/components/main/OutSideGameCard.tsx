import React, { FC } from "react";
import { gamePics } from "../../utils/gamePicsBuilder";
import mainStyles from '../../styles/mainpage.module.scss'
import { useTranslation } from "react-i18next";
interface MainPageCardProps {
  gameName: string;
  description: string;
  pictureName?: string;
  to: string;
}
export const OutSidePageCard: FC<MainPageCardProps> = ({
  gameName,
  pictureName = "default",
  description,
  to,
}) => {
  const {t} = useTranslation()

  return (
    <a href={to} className={mainStyles['game-card']} target="_blank" rel="noreferrer">
      <div className={mainStyles['game-card__picture']}>
        <img data-testid='game-pic' src={gamePics[pictureName]} alt="Game logo" />
      </div>
      <div className={mainStyles['game-info']}>
        <h1 className={mainStyles['game-title']}>{t(gameName)}</h1>
        <p className={mainStyles['game-description']}>{t(description)}</p>
      </div>
    </a>
  );
};
