import React, { FC } from 'react';
import mainStyles from '../../main/assets/styles/mainpage.module.scss';

interface GameLabelProps {
  text: string;
}

export const GameLabel: FC<GameLabelProps> = ({ text }) => {
  return <div className={mainStyles['game-label']}>{text}</div>;
};
