import React, { FC } from 'react';
import { Figure } from '../../models/figures/figure';
import styles from '../../assets/styles/chess.module.scss';
import { LostFiguresItem } from './LostFiguresItem';

interface ILostFiguresProps {
  title: string;
  figures: Figure[];
}

export const LostFigures: FC<ILostFiguresProps> = ({ title, figures }) => {
  return (
    <div className={styles['lost-figures']}>
      <h3 className={styles['lost-figures__title']}>{title}:</h3>
      {figures.map((figure) => (
        <LostFiguresItem
          key={figure.id}
          figure={figure}
        />
      ))}
    </div>
  );
};
