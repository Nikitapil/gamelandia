import { FigureNames } from "../constants/chess";
import { Colors } from "../models/chess/Colors";

export interface IFireBaseChessFigure {
  color: Colors;
  name: FigureNames;
}

export interface IFirebaseChessCell {
  x: number;
  y: number;
  color: Colors;
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
  white: number
}
