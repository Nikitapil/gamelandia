import { Colors } from '../models/Colors';
import { Figure } from '../models/figures/figure';

export enum FigureNames {
  FIGURE = 'FIGURE',
  KING = 'KING',
  KNIGHT = 'KNIGHT',
  PAWN = 'PAWN',
  QUEEN = 'QUEEN',
  ROOK = 'ROOK',
  BISHOP = 'BISHOP'
}

export type Kings = {
  [key in Colors]: Figure | null;
};
