import { v4 as uuidv4 } from 'uuid';
import { NumbersCellModel } from './NumbersCellModel';
import { NumbersBoardModel } from './NumbersBoardModel';

export class NumbersElemModel {
  x: number;

  y: number;

  cell: NumbersCellModel;

  value: number;

  id: string;

  board: NumbersBoardModel;

  constructor(cell: NumbersCellModel, board: NumbersBoardModel) {
    this.cell = cell;
    this.board = board;
    this.y = cell.y;
    this.x = cell.x;
    this.value = Math.random() > 0.95 ? 4 : 2;
    this.id = uuidv4();
    cell.elem = this;
  }

  move(cell: NumbersCellModel) {
    // TODO проверить что правильно удаляется и сетится элемент
    this.cell.elem = null;
    this.cell = cell;
    this.y = cell.y;
    this.x = cell.x;
    if (cell.elem) {
      this.value += cell.elem.value;
      this.board.elems = this.board.elems.filter(
        (elem) => elem.id !== cell.elem?.id
      );
      cell.elem = null;
    }
    cell.elem = this;
  }

  checkIsMoveAvailable() {
    const up = !!this.board.getVerticalAvailableCell(this, 1);
    const down = !!this.board.getVerticalAvailableCell(this, -1);
    const left = !!this.board.getHorizontalAvailableCell(this, 1);
    const right = !!this.board.getHorizontalAvailableCell(this, -1);
    return up || down || left || right;
  }
}
