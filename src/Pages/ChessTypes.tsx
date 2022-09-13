import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { breadcrumbs } from '../constants/breadcrumbs';
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import { useTitle } from '../hooks/useTitle';
import '../styles/chess.scss';

export const ChessTypes = () => {
  const { t } = useTranslation();
  useTitle(t('chess'));
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.chessTypes]);
  return (
    <div className="chess-types">
      <Link to="/chess/rooms" className="chessTypes__item">
        Online
      </Link>
      <Link to="/chess/offline" className="chessTypes__item">
        Offline
      </Link>
    </div>
  );
};
