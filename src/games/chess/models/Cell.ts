import { v4 as uuidv4 } from 'uuid';
import { Board } from './Board';
import { EChessColors } from './EChessColors';
import { Figure } from './figures/Figure';

export class Cell {
  readonly x: number;

  readonly y: number;

  readonly color: EChessColors;

  figure: Figure | null;

  board: Board;

  available: boolean;

  id: number;

  constructor(board: Board, x: number, y: number, color: EChessColors, figure: Figure | null) {
    this.board = board;
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.available = false;
    this.id = uuidv4();
  }

  setFigure(figure: Figure | null) {
    this.figure = figure;
    if (this.figure) {
      this.figure.cell = this;
    }
  }

  addLostfigure(figure: Figure) {
    if (figure.color === EChessColors.BLACK) {
      this.board.lostBlackFigures.push(figure);
      return;
    }
    this.board.lostWhiteFigures.push(figure);
  }

  moveFigure(target: Cell) {
    if (this.figure && this.figure.canMove(target)) {
      if (target.figure) {
        this.addLostfigure(target.figure);
      }
      const targetFigure = target.figure || null;
      target.setFigure(this.figure);
      this.figure = null;
      if (this.board.kings[target.figure?.color!]?.cell!.isUnderAttack()) {
        if (targetFigure) {
          if (targetFigure.color === EChessColors.BLACK) {
            this.board.lostBlackFigures.pop();
          } else {
            this.board.lostWhiteFigures.pop();
          }
        }
        this.setFigure(target.figure);
        target.setFigure(targetFigure);
        return false;
      }
      return true;
    }
  }

  isEmpty() {
    return !this.figure;
  }

  isEnemy(target: Cell): boolean {
    if (target.figure) {
      return this.figure?.color !== target.figure.color;
    }
    return false;
  }

  isEmptyDiagonal(target: Cell): boolean {
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);
    if (absX !== absY) {
      return false;
    }
    const dy = this.y < target.y ? 1 : -1;
    const dx = this.x < target.x ? 1 : -1;
    for (let i = 1; i < absY; i++) {
      if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isEmptyVertical(target: Cell): boolean {
    if (this.x !== target.x) {
      return false;
    }
    const min = Math.min(this.y, target.y);
    const max = Math.max(this.y, target.y);
    for (let y = min + 1; y < max; y++) {
      if (!this.board.getCell(this.x, y).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isEmptyHorizontal(target: Cell): boolean {
    if (this.y !== target.y) {
      return false;
    }
    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);
    for (let x = min + 1; x < max; x++) {
      if (!this.board.getCell(x, this.y).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isUnderAttack() {
    for (let i = 0; i < this.board.cells.length; i++) {
      const row = this.board.cells[i];

      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        if (cell.figure?.canMove(this)) {
          return true;
        }
      }
    }

    return false;
  }
}
