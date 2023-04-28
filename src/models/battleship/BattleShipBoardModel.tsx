import { EBattleShipElemDirection } from '../../constants/battleship';
import { BattleshipCellModel } from './BattleShipCellModel';
import { BattleShipElemModel } from './BattleShipElemModel';

export class BattleshipBoardModel {
  cells: BattleshipCellModel[][] = [];

  freeElems: BattleShipElemModel[] = [];

  isEnemyBoard = false;

  ships: BattleShipElemModel[] = [];

  constructor(isEnemyBoard = false, ships = []) {
    this.isEnemyBoard = isEnemyBoard;
    this.ships = ships;
  }

  initCells() {
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push(new BattleshipCellModel(i, j, this));
      }
      this.cells.push(row);
    }
  }

  private createFourBattleElem() {
    this.freeElems.push(new BattleShipElemModel(4));
  }

  private createThreeBattleElems() {
    this.freeElems.push(new BattleShipElemModel(3), new BattleShipElemModel(3));
  }

  private createTwoBattleElems() {
    this.freeElems.push(
      new BattleShipElemModel(2),
      new BattleShipElemModel(2),
      new BattleShipElemModel(2)
    );
  }

  private createOneBattleElems() {
    this.freeElems.push(
      new BattleShipElemModel(1),
      new BattleShipElemModel(1),
      new BattleShipElemModel(1),
      new BattleShipElemModel(1)
    );
  }

  createAllFreeElems() {
    this.createFourBattleElem();
    this.createThreeBattleElems();
    this.createTwoBattleElems();
    this.createOneBattleElems();
  }

  private setAllCellUnavailableForAdd() {
    this.cells.forEach((row) => {
      row.forEach((cell) => {
        cell.isAddAvailable = false;
      });
    });
  }

  checkIsAddAvailable(
    cell: BattleshipCellModel,
    currentElem: BattleShipElemModel
  ) {
    this.setAllCellUnavailableForAdd();
    let cells: BattleshipCellModel[] = [];
    for (let i = 0; i < currentElem.size; i++) {
      if (currentElem.direction === EBattleShipElemDirection.HORIZONTAL) {
        cells.push(this.cells[cell.y][cell.x + i]);
      } else {
        if (!this.cells[cell.y + i]) {
          return false;
        }
        cells.push(this.cells[cell.y + i][cell.x]);
      }
    }
    if (cells.some((item) => item === undefined)) {
      return false;
    }
    cells.forEach((c) => {
      if (this.cells[c.y + 1]) {
        cells.push(
          this.cells[c.y + 1][c.x],
          this.cells[c.y + 1][c.x + 1],
          this.cells[c.y + 1][c.x - 1]
        );
      }
      if (this.cells[c.y - 1]) {
        cells.push(
          this.cells[c.y - 1][c.x],
          this.cells[c.y - 1][c.x - 1],
          this.cells[c.y - 1][c.x + 1]
        );
      }
      cells.push(this.cells[c.y][c.x + 1], this.cells[c.y][c.x - 1]);
    });
    cells = cells.filter((item) => item);
    return cells.every((item) => item.isEmpty);
  }

  highlightCells(cell: BattleshipCellModel, currentElem: BattleShipElemModel) {
    for (let i = 0; i < currentElem.size; i++) {
      if (currentElem.direction === EBattleShipElemDirection.HORIZONTAL) {
        this.cells[cell.y][cell.x + i].isAddAvailable = true;
      } else {
        this.cells[cell.y + i][cell.x].isAddAvailable = true;
      }
    }
  }

  addShipOnBoard(cell: BattleshipCellModel, currentElem: BattleShipElemModel) {
    for (let i = 0; i < currentElem.size; i++) {
      if (currentElem.direction === EBattleShipElemDirection.HORIZONTAL) {
        this.cells[cell.y][cell.x + i].elem = currentElem;
        currentElem.cells.push(this.cells[cell.y][cell.x + i]);
      } else {
        this.cells[cell.y + i][cell.x].elem = currentElem;
        currentElem.cells.push(this.cells[cell.y + i][cell.x]);
      }
      this.freeElems = this.freeElems.filter((el) => el.id !== currentElem.id);
      this.setAllCellUnavailableForAdd();
    }
    this.ships.push(currentElem);
  }

  checkWinner() {
    return this.ships.every((ship) => ship.isDestroyed);
  }

  copyBoard() {
    const newBoard = new BattleshipBoardModel();
    newBoard.cells = this.cells;
    newBoard.freeElems = this.freeElems;
    newBoard.isEnemyBoard = this.isEnemyBoard;
    newBoard.ships = this.ships;
    return newBoard;
  }
}
