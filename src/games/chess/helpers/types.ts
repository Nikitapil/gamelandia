import { EFigureNames } from './constants';
import { EChessColors } from '../models/EChessColors';

export interface IFireBaseChessFigure {
  color: EChessColors;
  name: EFigureNames;
}

export interface IFirebaseChessCell {
  x: number;
  y: number;
  color: EChessColors;
  figure: IFireBaseChessFigure | null;
}

export interface IFirebaseChessBoard {
  cells: IFirebaseChessCell[];
  lostBlackFigures: IFireBaseChessFigure[];
  lostWhightFigures: IFireBaseChessFigure[];
  underAttackMessage: string;
}

export interface IChessTime {
  black: number;
  white: number;
}
