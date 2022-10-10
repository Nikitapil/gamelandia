import { v4 as uuidv4 } from 'uuid';
import { SnakeBoardModel } from './SnakeBoardModel';
import { SnakeElemModel } from './SnakeElemModel';

export class SnakeCellModel {
  board: SnakeBoardModel | null = null;

  id: number;

  x: number;

  y: number;

  elem: SnakeElemModel | null = null;

  food = false;

  constructor(board: SnakeBoardModel, x: number, y: number) {
    this.board = board;
    this.id = uuidv4();
    this.x = x;
    this.y = y;
  }
}
