import { INVADERS_FIELD_WIDTH, INVADERS_GUN_STEP } from '../constants';

export class InvadersGunModel {
  x: number;

  constructor(x: number) {
    this.x = x;
  }

  toLeft() {
    if (this.x > 0) {
      this.x -= INVADERS_GUN_STEP;
    }
  }

  toRight() {
    if (this.x < INVADERS_FIELD_WIDTH) {
      this.x += INVADERS_GUN_STEP;
    }
  }
}
