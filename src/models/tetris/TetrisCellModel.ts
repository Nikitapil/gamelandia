import { TetrisBoardModel } from './TetrisBoardModel';
import { TetrisElem } from './TetrisElem';

export class TetrisCellModel {
  board: TetrisBoardModel;

  x: number;

  y: number;

  elem: TetrisElem | null = null;

  constructor(board: TetrisBoardModel, x: number, y: number) {
    this.board = board;
    this.x = x;
    this.y = y;
  }
}
