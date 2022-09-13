import React from 'react';
import { useTranslation } from 'react-i18next';
import { RoundLoader } from '../../UI/Loaders/RoundLoader';

export const ChessOnlineLoader = () => {
  const { t } = useTranslation();
  return (
    <div className="chess-online__loader">
      <h2 className="page-title">{t('waiting_player')}</h2>
      <RoundLoader />
    </div>
  );
};
