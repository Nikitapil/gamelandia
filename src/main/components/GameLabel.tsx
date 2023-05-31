import React, { FC } from 'react';
import styles from '../assets/styles/mainpage.module.scss';

interface GameLabelProps {
  text: string;
}

export const GameLabel: FC<GameLabelProps> = ({ text }) => {
  return <div className={styles['game-label']}>{text}</div>;
};
