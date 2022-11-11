import chunk from 'lodash/chunk';
import { BattleshipCellModel } from '../../models/battleship/BattleShipCellModel';
import { BattleShipElemModel } from '../../models/battleship/BattleShipElemModel';
import { IFireBaseCells, IFirebaseShip } from '../../types/battleshipTypes';
import { BattleshipBoardModel } from '../../models/battleship/BattleShipBoardModel';

export const mapCellsToFirebase = (cells: BattleshipCellModel[][]) => {
  return cells.flat().map((cell) => ({
    x: cell.x,
    y: cell.y,
    isAttacked: cell.isAttacked
  }));
};

export const mapCellsToShipObject = (cells: BattleshipCellModel[]) => {
  return cells.map((cell) => ({ x: cell.x, y: cell.y }));
};

export const mapShipsToFirebase = (ships: BattleShipElemModel[]) => {
  return ships.map((ship) => ({
    size: ship.size,
    cells: mapCellsToShipObject(ship.cells),
    direction: ship.direction
  }));
};

export const mapCellsFromFirebase = (cells: BattleshipCellModel[]) => {
  return chunk(cells, 10);
};

export const mapShipsFromFireBase = (
  ships: IFirebaseShip[],
  board: BattleshipBoardModel
) => {
  return ships.map((ship) => {
    const cells = ship.cells.map((cell) => board.cells[cell.y][cell.x]);
    const newShip = new BattleShipElemModel(ship.size, ship.direction);
    cells.forEach((cell) => (cell.elem = newShip));
    newShip.cells = cells;
    return newShip;
  });
};

export const mapFromFireBaseToBattleShip = (
  cells: IFireBaseCells[],
  ships: IFirebaseShip[],
  isEnemyBoard: boolean
) => {
  const newBoard = new BattleshipBoardModel(isEnemyBoard);
  newBoard.cells = mapCellsFromFirebase(
    cells.map(
      (cell) =>
        new BattleshipCellModel(cell.y, cell.x, newBoard, cell.isAttacked)
    )
  );
  newBoard.ships = mapShipsFromFireBase(ships, newBoard);
  return newBoard;
};
