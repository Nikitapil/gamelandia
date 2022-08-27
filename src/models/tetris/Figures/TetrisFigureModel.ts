import { TetrisBoardModel } from "./../TetrisBoardModel";
import { TetrisElem } from "./../TetrisElem";
import { ETetrisColors, ETetrisDirections } from "../../../constants/tetris";
import { TetrisCellModel } from "../TetrisCellModel";

export class TetrisFigureModel {
  color: ETetrisColors = ETetrisColors.BLUE;
  elems: TetrisElem[] = [];
  board: TetrisBoardModel;
  id: number;
  baseElem: TetrisElem | null = null;
  possibleDirections: ETetrisDirections[] = [];
  currentDirection: ETetrisDirections = ETetrisDirections.UP;

  constructor(
    board: TetrisBoardModel,
    possibleDirections: ETetrisDirections[]
  ) {
    this.id = Math.random();
    this.board = board;
    this.possibleDirections = possibleDirections;
    this.currentDirection = this.possibleDirections[0];
  }

  moveDown() {
    const canMoveDown = this.elems.every((elem) =>
      elem.canMove(this.board.getCell(elem.cell.y + 1, elem.cell.x))
    );
    if (canMoveDown) {
      this.elems.forEach((elem) => {
        elem.move(this.board.getCell(elem.cell.y + 1, elem.cell.x));
      });
      this.elems.forEach((elem) => {
        elem.cell.elem = elem;
      });
    }
    return canMoveDown;
  }

  moveRight() {
    const canMoveRight = this.elems.every((elem) =>
      elem.canMove(this.board.getCell(elem.cell.y, elem.cell.x + 1))
    );
    if (canMoveRight) {
      this.elems.forEach((elem) => {
        elem.move(this.board.getCell(elem.cell.y, elem.cell.x + 1));
      });
      this.elems.forEach((elem) => {
        elem.cell.elem = elem;
      });
    }
  }

  moveLeft() {
    const canMoveLeft = this.elems.every((elem) =>
      elem.canMove(this.board.getCell(elem.cell.y, elem.cell.x - 1))
    );
    if (canMoveLeft) {
      this.elems.forEach((elem) => {
        elem.move(this.board.getCell(elem.cell.y, elem.cell.x - 1));
      });
      this.elems.forEach((elem) => {
        elem.cell.elem = elem;
      });
    }
  }

  createElement() {
    if (this.currentDirection === ETetrisDirections.UP) {
      this.createUpElem();
      return;
    }
    if (this.currentDirection === ETetrisDirections.DOWN) {
      this.createDownElem();
      return;
    }
    if (this.currentDirection === ETetrisDirections.RIGHT) {
      this.createRightElement();
      return;
    }
    if (this.currentDirection === ETetrisDirections.LEFT) {
      this.createLeftElement();
      return;
    }
  }

  changeDirection(direction?: ETetrisDirections) {
    try {
      if (direction) {
        this.currentDirection = direction;
        this.createElement();
        return;
      }
      const index = this.possibleDirections.indexOf(this.currentDirection);
      if (index + 1 < this.possibleDirections.length) {
        this.currentDirection = this.possibleDirections[index + 1];
      } else {
        this.currentDirection = this.possibleDirections[0];
      }
      this.createElement();
    } catch (error) {
      if (this.baseElem?.cell.x === 0) {
        this.moveRight();
        this.changeDirection(this.currentDirection);
      }
      if (this.baseElem?.cell.x === 9) {
        this.moveLeft();
        this.changeDirection(this.currentDirection);
      }
    }
  }

  updateElems(nextCells: TetrisCellModel[]) {
    const newElems = nextCells.map(cell => new TetrisElem(this.color, cell, this))
    this.elems = [this.baseElem!, ...newElems]
  }

  destroyNobaseElems() {
    this.elems.forEach((el) => {
      if (el !== this.baseElem) {
        el.destroyElem();
      }
    });
  }

  createUpElem() {}
  createDownElem() {}
  createRightElement() {}
  createLeftElement() {}
}
