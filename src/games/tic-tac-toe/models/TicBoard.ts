import { ETicTacIcons } from '../constants';
import { TicCell } from './TicCell';

export class TicBoard {
  cells: TicCell[][] = [];

  currentPlayer: ETicTacIcons = ETicTacIcons.XMARK;

  initCells() {
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        row.push(new TicCell(this, j, i));
      }
      this.cells.push(row);
    }
  }

  updateBoard() {
    this.currentPlayer =
      this.currentPlayer === ETicTacIcons.XMARK ? ETicTacIcons.CIRCLE : ETicTacIcons.XMARK;

    const newBoard = new TicBoard();
    newBoard.cells = this.cells;
    newBoard.currentPlayer = this.currentPlayer;
    return newBoard;
  }

  checkWinner() {
    const checkArrays = [...this.cells];
    const checkArraysDiagonal1 = [];
    const checkArraysDiagonal2 = [];
    const checkColumns = [];
    for (let i = 0; i < this.cells.length; i++) {
      checkArraysDiagonal1.push(this.cells[i][i]);
      const revers = Math.abs(i - 2);
      checkArraysDiagonal2.push(this.cells[i][revers]);
      const coll = [];
      for (let j = 0; j < 3; j++) {
        coll.push(this.cells[j][i]);
      }
      checkColumns.push(coll);
    }
    checkArrays.push(checkArraysDiagonal1, checkArraysDiagonal2, ...checkColumns);
    return checkArrays.some((row) =>
      row.every((cell) => cell.icon === row[0].icon && cell.icon !== null)
    );
  }

  checkIsWinnerOrDraw() {
    const checkIsAllFull = [...this.cells].flat().every((cell) => !!cell.icon);
    const isWinner = this.checkWinner();
    return {
      isWinner,
      isDraw: checkIsAllFull && !isWinner
    };
  }
}
