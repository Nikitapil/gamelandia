import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './winner-common.module.scss';

interface IWinnerCommonProps {
  winner: string;
  page: string;
}

export const WinnerCommon: FC<IWinnerCommonProps> = ({ winner, page }) => {
  const { t } = useTranslation();
  return (
    <div className={`container ${styles.winner__container}`}>
      <h2 className={styles.winner__title}>
        {t('the_winner_is')} {winner}
      </h2>
      <Link
        className={styles.link}
        to={page}
      >
        {t('go_to_rooms')}
      </Link>
    </div>
  );
};
