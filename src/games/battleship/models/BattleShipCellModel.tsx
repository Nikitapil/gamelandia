import { v4 as uuidv4 } from 'uuid';
import { BattleshipBoardModel } from './BattleShipBoardModel';
import { BattleShipElemModel } from './BattleShipElemModel';
import { getNeighboringCells } from '../helpers/utils';

export class BattleshipCellModel {
  x: number;

  y: number;

  board: BattleshipBoardModel;

  elem: BattleShipElemModel | null = null;

  isAttacked: boolean = false;

  id: string;

  isAddAvailable: boolean = false;

  constructor(
    y: number,
    x: number,
    board: BattleshipBoardModel,
    isAttacked = false
  ) {
    this.y = y;
    this.x = x;
    this.board = board;
    this.id = uuidv4();
    this.isAttacked = isAttacked;
  }

  get isEmpty() {
    return !this.elem;
  }

  setIsAttacked() {
    this.isAttacked = true;
    if (this.elem?.isDestroyed) {
      const { cells } = this.board;
      let tempCells: BattleshipCellModel[] = [];
      this.elem.cells.forEach((cell) => {
        tempCells.push(...getNeighboringCells(cells, cell));
      });
      tempCells = tempCells.filter((cell) => !!cell && !cell.elem);
      tempCells.forEach((cell) => (cell.isAttacked = true));
    }
  }
}
