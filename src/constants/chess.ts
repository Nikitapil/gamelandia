import { Colors } from "../models/chess/Colors";
import { Figure } from "../models/chess/figures/figure";

export enum FigureNames {
  FIGURE = "FIGURE",
  KING = "KING",
  KNIGHT = "KNIGHT",
  PAWN = "PAWN",
  QUEEN = "QUEEN",
  ROOK = "ROOK",
  BISHOP = "BISHOP",
}

export type Kings = {
  [key in Colors]: Figure | null;
};
