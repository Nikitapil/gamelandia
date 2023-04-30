import { cloneDeep } from 'lodash';
import { SnakeModel } from './SnakeModel';
import { SnakeCellModel } from './SnakeCellModel';

export class SnakeBoardModel {
  cells: SnakeCellModel[][] = [];

  snake: SnakeModel | null = null;

  gameOver: boolean = false;

  score: number = 0;

  initCells() {
    for (let i = 0; i < 20; i++) {
      const row = [];
      for (let j = 0; j < 20; j++) {
        row.push(new SnakeCellModel(this, j, i));
      }
      this.cells.push(row);
    }
  }

  addSnake() {
    this.snake = new SnakeModel(this);
    this.snake.addFirstElem(this.cells[0][4]);
    this.snake.addFirstElem(this.cells[0][3]);
    this.snake.addFirstElem(this.cells[0][2]);
    this.snake.addFirstElem(this.cells[0][1]);
    this.snake.addFirstElem(this.cells[0][0]);
  }

  updateBoard() {
    return cloneDeep(this);
  }

  endGame() {
    this.gameOver = true;
  }

  getRandomEmptyCell(): SnakeCellModel {
    const x = Math.floor(Math.random() * 20);
    const y = Math.floor(Math.random() * 20);
    return this.cells[y][x].elem ? this.getRandomEmptyCell() : this.cells[y][x];
  }

  addFood() {
    const cell = this.getRandomEmptyCell();
    cell.food = true;
  }
}
