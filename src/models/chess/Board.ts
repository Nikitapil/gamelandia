import { Figure } from './figures/figure';
import { Knight } from './figures/Knight';
import { Bishop } from './figures/Bishop';
import { King } from './figures/King';
import { Pawn } from './figures/Pawn';
import { Rook } from './figures/Rook';
import { Colors } from './Colors';
import { Cell } from './Cell';
import { Queen } from './figures/Queen';
import { Kings } from '../../constants/chess';

export class Board {
  cells: Cell[][] = [];

  lostBlackFigures: Figure[] = [];

  lostWhightFigures: Figure[] = [];

  kings: Kings = {
    white: null,
    black: null
  };

  underAttackMessage = '';

  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null)); // Черные
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null)); // белые
        }
      }
      this.cells.push(row);
    }
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  private addKing() {
    this.kings.black = new King(Colors.BLACK, this.getCell(4, 0));
    this.kings.white = new King(Colors.WHITE, this.getCell(4, 7));
  }

  private addBishop() {
    new Bishop(Colors.BLACK, this.getCell(2, 0));
    new Bishop(Colors.BLACK, this.getCell(5, 0));
    new Bishop(Colors.WHITE, this.getCell(2, 7));
    new Bishop(Colors.WHITE, this.getCell(5, 7));
  }

  private addKnight() {
    new Knight(Colors.BLACK, this.getCell(1, 0));
    new Knight(Colors.BLACK, this.getCell(6, 0));
    new Knight(Colors.WHITE, this.getCell(1, 7));
    new Knight(Colors.WHITE, this.getCell(6, 7));
  }

  private addPawn() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.BLACK, this.getCell(i, 1));
      new Pawn(Colors.WHITE, this.getCell(i, 6));
    }
  }

  private addQueen() {
    new Queen(Colors.BLACK, this.getCell(3, 0));
    new Queen(Colors.WHITE, this.getCell(3, 7));
  }

  private addRook() {
    new Rook(Colors.BLACK, this.getCell(0, 0));
    new Rook(Colors.BLACK, this.getCell(7, 0));
    new Rook(Colors.WHITE, this.getCell(0, 7));
    new Rook(Colors.WHITE, this.getCell(7, 7));
  }

  public addFigures() {
    this.addBishop();
    this.addKing();
    this.addKnight();
    this.addPawn();
    this.addQueen();
    this.addRook();
  }

  public highLightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.available = !!selectedCell?.figure?.canMove(target);
      }
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    newBoard.lostWhightFigures = this.lostWhightFigures;
    newBoard.kings = this.kings;
    newBoard.underAttackMessage = this.underAttackMessage;
    return newBoard;
  }

  checkIfKingIsUnderAttack() {
    if (this.kings.white?.cell!.isUnderAttack()) {
      this.underAttackMessage = 'White king is under attack';
      return;
    }
    if (this.kings.black?.cell!.isUnderAttack()) {
      this.underAttackMessage = 'Black king is under attack';
      return;
    }
    this.underAttackMessage = '';
  }
}
