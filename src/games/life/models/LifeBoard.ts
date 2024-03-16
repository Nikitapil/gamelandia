import { LifeCell } from './LifeCell';

import { LIFE_BOARD_SIZE } from '../constants';

interface IReducedCellsByStatus {
  alive: LifeCell[];
  dead: LifeCell[];
}

export class LifeBoard {
  cells: LifeCell[][] = [];

  constructor(cells?: LifeCell[][]) {
    if (cells) {
      this.cells = cells;
    }
  }

  createCells() {
    for (let i = 0; i < LIFE_BOARD_SIZE; i++) {
      const current = [];
      for (let j = 0; j < LIFE_BOARD_SIZE; j++) {
        current.push(new LifeCell({ y: i, x: j }));
      }
      this.cells.push(current);
    }
  }

  private getCellNeighbours(cell: LifeCell) {
    const { x, y } = cell;
    return [
      this.cells[y - 1]?.[x - 1],
      this.cells[y - 1]?.[x],
      this.cells[y - 1]?.[x + 1],
      this.cells[y]?.[x - 1],
      this.cells[y]?.[x + 1],
      this.cells[y + 1]?.[x - 1],
      this.cells[y + 1]?.[x],
      this.cells[y + 1]?.[x + 1]
    ].filter(Boolean);
  }

  private getReducedByStatusCells(cells: LifeCell[]) {
    return cells.reduce(
      (acc: IReducedCellsByStatus, item) => {
        if (item?.isAlive) {
          acc.alive.push(item);
        } else {
          acc.dead.push(item);
        }
        return acc;
      },
      { dead: [], alive: [] }
    );
  }

  moveCells() {
    this.cells.forEach((row) => {
      row.forEach((cell) => {
        const neighboursByStatus = this.getReducedByStatusCells(this.getCellNeighbours(cell));
        if (
          cell.isAlive &&
          !(neighboursByStatus.alive.length === 2 || neighboursByStatus.alive.length === 3)
        ) {
          cell.setIsAlive(false);
        } else if (!cell.isAlive && neighboursByStatus.alive.length === 3) {
          cell.setIsAlive(true);
        }
      });
    });
  }

  updateBoard() {
    return new LifeBoard(this.cells);
  }
}
