import { EInvadersDirections } from "../../domain/invadersTypes";
import { InvadersBulletModel } from "./InvadersBulletModel";
import { InvadersCellModel } from "./InvadersCellModel";
import { InvadersGunModel } from "./InvadersGunModel";

export class InvadersFieldModel {
  cells: InvadersCellModel[][] = [];
  isGameStarted = false;
  direction: EInvadersDirections = EInvadersDirections.RIGHT;
  nextY = 0;
  isFirstMove = true;
  gun = new InvadersGunModel(0);
  bullet: InvadersBulletModel | null = null;

  initCells(): void {
    for (let i = 0; i < 5; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push(new InvadersCellModel(j * 45, i * 35 + 20, this));
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
            ? cell.x + 10
            : cell.x - 10;
        cell.y += this.nextY;
      });
    });
    this.nextY = 0;
    this.isFirstMove = false;
  }

  get isEmpty() {
    return (
      this.cells.length && this.cells.flat().every((cell) => !cell.isWithElem)
    );
  }
}
