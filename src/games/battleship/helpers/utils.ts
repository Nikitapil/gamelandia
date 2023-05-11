import { BattleshipCellModel } from '../models/BattleShipCellModel';

export const getNeighboringCells = (
  allCells: BattleshipCellModel[][],
  currentCell: BattleshipCellModel
) => {
  const result = [];
  const { x, y } = currentCell;
  if (allCells[y + 1]) {
    result.push(
      allCells[y + 1][x],
      allCells[y + 1][x + 1],
      allCells[y + 1][x - 1]
    );
  }
  if (allCells[y - 1]) {
    result.push(
      allCells[y - 1][x],
      allCells[y - 1][x + 1],
      allCells[y - 1][x - 1]
    );
  }
  result.push(allCells[y][x - 1], allCells[y][x + 1]);

  return result;
};
