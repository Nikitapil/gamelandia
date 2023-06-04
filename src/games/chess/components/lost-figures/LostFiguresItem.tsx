import React from 'react';
import { useTranslation } from 'react-i18next';
import { Figure } from '../../models/figures/Figure';
import styles from '../../assets/styles/chess.module.scss';

interface ILostFiguresItemProps {
  figure: Figure;
}

export const LostFiguresItem = ({ figure }: ILostFiguresItemProps) => {
  const { t } = useTranslation();
  return (
    <div className={styles['lost-figures__item']}>
      {t(figure.name)}
      {figure.logo && (
        <img
          src={figure.logo}
          alt="figure icon"
        />
      )}
    </div>
  );
};
