import { TetrisFigureModel } from "../models/tetris/Figures/TetrisFigureModel";
import { TetrisCellModel } from "../models/tetris/TetrisCellModel";

export interface ITetrisNextCells {
  right: TetrisCellModel[];
  left: TetrisCellModel[];
  up: TetrisCellModel[];
  down: TetrisCellModel[];
}

export interface ITetrisFiguresObject {
  [key: string]: typeof TetrisFigureModel;
}
