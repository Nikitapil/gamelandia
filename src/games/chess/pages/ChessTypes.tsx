import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { breadcrumbs } from '../../../constants/breadcrumbs';
import { useBreadcrumbs } from '../../../hooks/useBreadcrumbs';
import { useTitle } from '../../../hooks/useTitle';
import '../assets/styles/chess.scss';
import { ERoutes } from '../../../constants/routes';

export const ChessTypes = () => {
  const { t } = useTranslation();
  useTitle(t('chess'));
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.chessTypes]);
  return (
    <div className="chess-types">
      <Link to={`${ERoutes.CHESS_ROOMS}`} className="chessTypes__item">
        Online
      </Link>
      <Link to={`${ERoutes.CHESS_OFFLINE}`} className="chessTypes__item">
        Offline
      </Link>
    </div>
  );
};
