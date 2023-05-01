import React from 'react';
import {
  BsFillSuitDiamondFill,
  BsFillSuitHeartFill,
  BsFillSuitSpadeFill,
  BsFillSuitClubFill
} from 'react-icons/bs';
import { ESolitaireCardsColors, ESolitaireSuites } from '../constants';

interface SolitaireCardIconProps {
  suit: ESolitaireSuites;
  color: ESolitaireCardsColors;
}

export const SolitaireCardIcon = ({ suit, color }: SolitaireCardIconProps) => {
  if (suit === ESolitaireSuites.DIAMONDS) {
    return <BsFillSuitDiamondFill style={{ color }} />;
  }

  if (suit === ESolitaireSuites.HEARTS) {
    return <BsFillSuitHeartFill style={{ color }} />;
  }

  if (suit === ESolitaireSuites.SPADES) {
    return <BsFillSuitSpadeFill style={{ color }} />;
  }

  return <BsFillSuitClubFill style={{ color }} />;
};
