import { SnakeCellModel } from './SnakeCellModel';
import { SnakeModel } from './SnakeModel';
export class SnakeElemModel {
    cell:SnakeCellModel | null;
    snake:SnakeModel;
    constructor(cell: SnakeCellModel, snake: SnakeModel) {
        this.cell = cell;
        this.snake = snake;
        this.cell.elem = this
    }
}