import {
  BULLET_MOVE_STEP,
  BULLET_START_POSITION
} from '../../constants/invaders';

export class InvadersBulletModel {
  y = BULLET_START_POSITION;

  x: number;

  isDestroyed = false;

  constructor(x: number) {
    this.x = x;
  }

  move() {
    this.y += BULLET_MOVE_STEP;
  }

  copyBullet() {
    const newBullet = new InvadersBulletModel(this.x);
    newBullet.y = this.y;
    return newBullet;
  }

  destroy() {
    this.isDestroyed = true;
  }
}
