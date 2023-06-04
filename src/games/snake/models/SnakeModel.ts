import { ESnakeDirections } from '../constants';
import { SnakeBoardModel } from './SnakeBoardModel';
import { SnakeCellModel } from './SnakeCellModel';
import { SnakeElemModel } from './SnakeElemModel';

export class SnakeModel {
  elems: SnakeElemModel[] = [];

  direction: ESnakeDirections = ESnakeDirections.RIGHT;

  board: SnakeBoardModel;

  constructor(board: SnakeBoardModel) {
    this.board = board;
  }

  addFirstElem(cell: SnakeCellModel) {
    this.elems.push(new SnakeElemModel(cell, this));
  }

  private getNextCell() {
    const currentCellX = this.elems[0].cell.x;
    const currentCellY = this.elems[0].cell.y;
    switch (this.direction) {
      case ESnakeDirections.RIGHT:
        return (
          this.board.cells[currentCellY][currentCellX + 1] || this.board.cells[currentCellY][0]
        );
      case ESnakeDirections.LEFT:
        return (
          this.board.cells[currentCellY][currentCellX - 1] || this.board.cells[currentCellY][19]
        );
      case ESnakeDirections.BOTTOM:
        return this.board.cells[currentCellY + 1]
          ? this.board.cells[currentCellY + 1][currentCellX!]
          : this.board.cells[0][currentCellX];
      case ESnakeDirections.TOP:
        return this.board.cells[currentCellY - 1]
          ? this.board.cells[currentCellY - 1][currentCellX]
          : this.board.cells[19][currentCellX];
      default:
        throw new Error('Unknown direction');
    }
  }

  move() {
    const nextCell = this.getNextCell();
    if (nextCell?.elem) {
      this.board.endGame();
      return;
    }
    this.elems[this.elems.length - 1].cell.elem = null;
    if (!nextCell?.food) {
      this.elems.pop();
    }
    this.elems.unshift(new SnakeElemModel(nextCell, this));
    if (nextCell?.food) {
      this.board.score++;
      nextCell.food = false;
      this.board.addFood();
    }
  }

  changeDirection(direction: ESnakeDirections) {
    this.direction = direction;
  }

  get isCurrentVertical() {
    return this.direction === ESnakeDirections.TOP || this.direction === ESnakeDirections.BOTTOM;
  }

  get isCurrentHorizontal() {
    return this.direction === ESnakeDirections.LEFT || this.direction === ESnakeDirections.RIGHT;
  }
}
