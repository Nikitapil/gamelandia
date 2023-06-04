import React from 'react';
import { WinsCount } from '../../wins-count/components/WinsCount';
import { EGamesNames } from '../constants';

interface IGameTitleWithWinners {
  title: string;
  gameName: EGamesNames;
}

export const GameTitleWithWinners = ({ title, gameName }: IGameTitleWithWinners) => {
  return (
    <div className="d-flex gap-10 align-center">
      <h1 className="page-title">{title}</h1>
      <WinsCount gameName={gameName} />
    </div>
  );
};
