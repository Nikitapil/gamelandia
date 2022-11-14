import React from 'react';
import { useTranslation } from 'react-i18next';
import { RoundLoader } from '../../UI/Loaders/RoundLoader';
import { DynoGame } from '../../DynoGame/DynoGame';

export const ChessOnlineLoader = () => {
  const { t } = useTranslation();
  return (
    <div className="chess-online__loader">
      <h2 className="page-title">{t('waiting_player')}</h2>
      <RoundLoader />
      <div className="chess-dyno">
        <DynoGame />
      </div>
    </div>
  );
};
