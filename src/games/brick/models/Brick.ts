import {
  BRICK_HEIGHT,
  BRICK_OFFSET_LEFT,
  BRICK_OFFSET_TOP,
  BRICK_PADDING,
  BRICK_WIDTH
} from '../constants';

export class Brick {
  x: number;

  y: number;

  isVisible = true;

  constructor(x: number, y: number) {
    this.x = x * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFFSET_LEFT;
    this.y = y * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET_TOP;
  }
}
