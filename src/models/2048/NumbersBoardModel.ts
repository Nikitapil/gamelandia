import { NumbersCellModel } from './NumbersCellModel';
import { NumbersElemModel } from './NumbersElemModel';
import { ENumbersDirections } from '../../constants/2048';

export class NumbersBoardModel {
  cells: NumbersCellModel[][] = [];

  elems: NumbersElemModel[] = [];

  isGameOver: boolean = false;

  lastScore: number = 0;

  createCells() {
    for (let i = 0; i < 4; i++) {
      const row = [];
      for (let j = 0; j < 4; j++) {
        row.push(new NumbersCellModel(i, j));
      }
      this.cells.push(row);
    }
  }

  getRandomEmptyCell(): NumbersCellModel {
    const x = Math.floor(Math.random() * 4);
    const y = Math.floor(Math.random() * 4);
    return this.cells[y][x].elem ? this.getRandomEmptyCell() : this.cells[y][x];
  }

  createElem() {
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

  moveUp() {
    let isMove = false;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
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
    this.cleanElems();
    if (isMove) {
      this.createElem();
    }
  }

  moveDown() {
    let isMove = false;
    for (let i = 3; i >= 0; i--) {
      for (let j = 0; j < 4; j++) {
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
    this.cleanElems();
    if (isMove) {
      this.createElem();
    }
  }

  moveLeft() {
    let isMove = false;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
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
    this.cleanElems();
    if (isMove) {
      this.createElem();
    }
  }

  moveRight() {
    let isMove = false;
    for (let i = 0; i < 4; i++) {
      for (let j = 3; j >= 0; j--) {
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
    this.cleanElems();
    if (isMove) {
      this.createElem();
    }
  }

  // TODO Убрать сапресс
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  move(direction: ENumbersDirections) {
    switch (direction) {
      case ENumbersDirections.TOP:
        this.moveUp();
        break;
      case ENumbersDirections.BOTTOM:
        this.moveDown();
        break;
      case ENumbersDirections.LEFT:
        this.moveLeft();
        break;
      case ENumbersDirections.RIGHT:
        this.moveRight();
        break;
      default:
        this.moveUp();
    }
    this.checkIsGameOver();
  }

  checkIsGameOver() {
    if (this.elems.length < 16) {
      return false;
    }
    this.isGameOver = !this.elems.some((elem) => elem.checkIsMoveAvailable());
    this.lastScore = Math.max(...this.elems.map((el) => el.value));
  }

  cleanElems() {
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
