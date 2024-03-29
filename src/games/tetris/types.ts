import { TetrisFigureModel } from './models/Figures/TetrisFigureModel';
import { TetrisCellModel } from './models/TetrisCellModel';

export interface ITetrisNextCells {
  right: TetrisCellModel[];
  left: TetrisCellModel[];
  up: TetrisCellModel[];
  down: TetrisCellModel[];
}

export interface ITetrisFiguresObject {
  [key: string]: typeof TetrisFigureModel;
}
