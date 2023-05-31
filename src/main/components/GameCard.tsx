import React from 'react';
import { IGameCard } from '../types';
import { InternalGameCard } from './InternalGameCard';
import { OutSideGameCard } from './OutSideGameCard';

interface IGameCardProps {
  card: IGameCard;
}

export const GameCard = ({ card }: IGameCardProps) => {
  if (card.isOutside) {
    return <OutSideGameCard card={card} />;
  }

  return <InternalGameCard card={card} />;
};
