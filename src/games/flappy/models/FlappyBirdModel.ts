import { FLAPPY_START_POSITION, FLAPPY_STEP } from '../constants';

export class FlappyBirdModel {
  top: number = FLAPPY_START_POSITION;

  moveDown() {
    this.top++;
  }

  moveTop() {
    this.top -= FLAPPY_STEP;
  }
}
