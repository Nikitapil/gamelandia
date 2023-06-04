import { v4 as uuidv4 } from 'uuid';
import { InvadersFieldModel } from './InvadersFieldModel';
import { INVADER_CELL_HEIGHT, INVADER_CELL_WIDTH, INVADERS_HEIGHT_STEP } from '../constants';

export class InvadersCellModel {
  x: number;

  y: number;

  field: InvadersFieldModel;

  id: number;

  isWithElem = true;

  constructor(x: number, y: number, field: InvadersFieldModel) {
    this.x = x;
    this.y = y;
    this.field = field;
    this.id = uuidv4();
  }

  changeDirection() {
    this.field.changeDirection();
    this.field.nextY = INVADERS_HEIGHT_STEP;
  }

  destroyElem() {
    this.isWithElem = false;
  }

  get cellEnd() {
    return {
      xEnd: this.x + INVADER_CELL_WIDTH,
      yEnd: this.y + INVADER_CELL_HEIGHT
    };
  }
}
