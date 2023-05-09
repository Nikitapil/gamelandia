import { NumbersCellModel } from './NumbersCellModel';
import { NumbersElemModel } from './NumbersElemModel';
import {
  ENumbersDirections,
  NUMBERS_FIELD_SIZE,
  NUMBERS_MAX_ELEMS_COUNT
} from '../constants';
import { getRandomIntegerWithoutMaxValue } from '../../../utils/helpers';

export class NumbersBoardModel {
  cells: NumbersCellModel[][] = [];

  elems: NumbersElemModel[] = [];

  isGameOver: boolean = false;

  lastScore: number = 0;

  initNewGame() {
    this.createCells();
    this.createElem();
    this.createElem();
  }

  private createCells() {
    for (let i = 0; i < NUMBERS_FIELD_SIZE; i++) {
      const row = [];
      for (let j = 0; j < NUMBERS_FIELD_SIZE; j++) {
        row.push(new NumbersCellModel(i, j));
      }
      this.cells.push(row);
    }
  }

  private getRandomEmptyCell(): NumbersCellModel {
    const x = getRandomIntegerWithoutMaxValue(NUMBERS_FIELD_SIZE);
    const y = getRandomIntegerWithoutMaxValue(NUMBERS_FIELD_SIZE);
    return this.cells[y][x].elem ? this.getRandomEmptyCell() : this.cells[y][x];
  }

  private createElem() {
    const emptyCell = this.getRandomEmptyCell();
    if (emptyCell) {
      this.elems.push(new NumbersElemModel(emptyCell, this));
    }
  }

  getVerticalAvailableCell(elem: NumbersElemModel, nextIdx: number) {
    let nextCell = this.cells[elem.y - nextIdx]?.[elem.x];
    if (!nextCell) {
      return null;
    }
    let idx = 0;
    while (
      this.cells[nextCell.y - idx]?.[nextCell.x] &&
      (!this.cells[nextCell.y - idx]?.[nextCell.x].elem ||
        this.cells[nextCell.y - idx]?.[nextCell.x].elem?.value === elem.value)
    ) {
      nextCell = this.cells[nextCell.y - idx][nextCell.x];
      idx = nextIdx;
    }
    if (!nextCell.elem || nextCell.elem?.value === elem.value) {
      return nextCell;
    }
    return null;
  }

  getHorizontalAvailableCell(elem: NumbersElemModel, nextIdx: number) {
    let nextCell = this.cells[elem.y]?.[elem.x - nextIdx];
    if (!nextCell) {
      return null;
    }
    let idx = 0;
    while (
      this.cells[nextCell.y]?.[nextCell.x - idx] &&
      (!this.cells[nextCell.y]?.[nextCell.x - idx].elem ||
        this.cells[nextCell.y]?.[nextCell.x - idx].elem?.value === elem.value)
    ) {
      nextCell = this.cells[nextCell.y][nextCell.x - idx];
      idx = nextIdx;
    }
    if (!nextCell.elem || nextCell.elem?.value === elem.value) {
      return nextCell;
    }
    return null;
  }

  private moveUp() {
    let isMove = false;
    for (let i = 0; i < NUMBERS_FIELD_SIZE; i++) {
      for (let j = 0; j < NUMBERS_FIELD_SIZE; j++) {
        const cell = this.cells[i][j];
        if (cell.elem) {
          const nextCell = this.getVerticalAvailableCell(cell.elem, 1);
          if (nextCell) {
            cell.elem?.move(nextCell);
            isMove = true;
          }
        }
      }
    }
    return isMove;
  }

  private moveDown() {
    let isMove = false;
    for (let i = NUMBERS_FIELD_SIZE - 1; i >= 0; i--) {
      for (let j = 0; j < NUMBERS_FIELD_SIZE; j++) {
        const cell = this.cells[i][j];
        if (cell.elem) {
          const nextCell = this.getVerticalAvailableCell(cell.elem, -1);
          if (nextCell) {
            cell.elem?.move(nextCell);
            isMove = true;
          }
        }
      }
    }
    return isMove;
  }

  private moveLeft() {
    let isMove = false;
    for (let i = 0; i < NUMBERS_FIELD_SIZE; i++) {
      for (let j = 0; j < NUMBERS_FIELD_SIZE; j++) {
        const cell = this.cells[i][j];
        if (cell.elem) {
          const nextCell = this.getHorizontalAvailableCell(cell.elem, 1);
          if (nextCell) {
            cell.elem?.move(nextCell);
            isMove = true;
          }
        }
      }
    }
    return isMove;
  }

  private moveRight() {
    let isMove = false;
    for (let i = 0; i < NUMBERS_FIELD_SIZE; i++) {
      for (let j = NUMBERS_FIELD_SIZE - 1; j >= 0; j--) {
        const cell = this.cells[i][j];
        if (cell.elem) {
          const nextCell = this.getHorizontalAvailableCell(cell.elem, -1);
          if (nextCell) {
            cell.elem?.move(nextCell);
            isMove = true;
          }
        }
      }
    }
    return isMove;
  }

  move(direction: ENumbersDirections) {
    let isMove;
    switch (direction) {
      case ENumbersDirections.TOP:
        isMove = this.moveUp();
        break;
      case ENumbersDirections.BOTTOM:
        isMove = this.moveDown();
        break;
      case ENumbersDirections.LEFT:
        isMove = this.moveLeft();
        break;
      case ENumbersDirections.RIGHT:
        isMove = this.moveRight();
        break;
      default:
        isMove = this.moveUp();
    }
    this.cleanElems();
    if (isMove) {
      this.createElem();
    }
    this.checkIsGameOver();
  }

  checkIsGameOver() {
    if (this.elems.length < NUMBERS_MAX_ELEMS_COUNT) {
      return false;
    }
    this.isGameOver = !this.elems.some((elem) => elem.checkIsMoveAvailable());
    this.lastScore = Math.max(...this.elems.map((el) => el.value));
  }

  private cleanElems() {
    this.elems = this.elems.filter(
      (elem) => elem.value === elem.cell.elem?.value
    );
  }

  getCopyBoard() {
    const newBoard = new NumbersBoardModel();
    newBoard.cells = this.cells;
    newBoard.elems = this.elems;
    newBoard.isGameOver = this.isGameOver;
    newBoard.lastScore = this.lastScore;
    return newBoard;
  }
}
