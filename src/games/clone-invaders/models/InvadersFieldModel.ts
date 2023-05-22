import { EInvadersDirections } from '../types';
import { InvadersBulletModel } from './InvadersBulletModel';
import { InvadersCellModel } from './InvadersCellModel';
import { InvadersGunModel } from './InvadersGunModel';
import {
  INVADERS_CELL_HEIGHT_WITH_MARGIN,
  INVADERS_CELL_WIDTH_WITH_MARGIN,
  INVADERS_FIELD_Y_END,
  INVADERS_WIDTH_STEP
} from '../constants';

export class InvadersFieldModel {
  cells: InvadersCellModel[][] = [];

  isGameStarted = false;

  direction: EInvadersDirections = EInvadersDirections.RIGHT;

  nextY = 0;

  isFirstMove = true;

  gun = new InvadersGunModel(0);

  bullet: InvadersBulletModel | null = null;

  isGameOver = false;

  initCells(): void {
    for (let i = 0; i < 5; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push(
          new InvadersCellModel(
            j * INVADERS_CELL_WIDTH_WITH_MARGIN,
            i * INVADERS_CELL_HEIGHT_WITH_MARGIN + 20,
            this
          )
        );
      }
      this.cells.push(row);
    }
  }

  startGame() {
    this.isGameStarted = true;
    this.initCells();
  }

  copyBoard() {
    const newBoard = new InvadersFieldModel();
    newBoard.cells = this.cells;
    newBoard.isGameStarted = this.isGameStarted;
    newBoard.direction = this.direction;
    newBoard.nextY = this.nextY;
    newBoard.isFirstMove = false;
    newBoard.gun = this.gun;
    newBoard.bullet = this.bullet;
    newBoard.isGameOver = this.isGameOver;
    return newBoard;
  }

  changeDirection() {
    this.direction =
      this.direction === EInvadersDirections.RIGHT
        ? EInvadersDirections.LEFT
        : EInvadersDirections.RIGHT;
  }

  move() {
    this.cells.forEach((row) => {
      row.forEach((cell) => {
        cell.x =
          this.direction === EInvadersDirections.RIGHT
            ? cell.x + INVADERS_WIDTH_STEP
            : cell.x - INVADERS_WIDTH_STEP;
        cell.y += this.nextY;
        if (cell.y > INVADERS_FIELD_Y_END && cell.isWithElem) {
          this.isGameOver = true;
        }
      });
    });
    this.nextY = 0;
    this.isFirstMove = false;
  }

  get isEmpty() {
    return this.cells.length && this.cells.flat().every((cell) => !cell.isWithElem);
  }
}
