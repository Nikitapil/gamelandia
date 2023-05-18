import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { breadcrumbs } from '../../../constants/breadcrumbs';
import { useBreadcrumbs } from '../../../app/hooks/useBreadcrumbs';
import { useTitle } from '../../../hooks/useTitle';
import { ERoutes } from '../../../constants/routes';
import styles from '../assets/styles/chess.module.scss';

export const ChessTypes = () => {
  const { t } = useTranslation();
  useTitle(t('chess'));
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.chessTypes]);

  return (
    <div className={styles['chess-types']}>
      <Link
        to={`${ERoutes.CHESS_ROOMS}`}
        className={styles.chessTypes__item}
      >
        Online
      </Link>
      <Link
        to={`${ERoutes.CHESS_OFFLINE}`}
        className={styles.chessTypes__item}
      >
        Offline
      </Link>
    </div>
  );
};
