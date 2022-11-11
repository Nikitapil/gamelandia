import {
  FLAPPY_FIELD_HEIGHT,
  FLAPPY_FIELD_PADDING,
  FLAPPY_START_POSITION,
  FLAPPY_STEP
} from '../../constants/flappy';
import { FlappyGameModel } from './FlappyGameModel';

export class FlappyBirdModel {
  top: number = FLAPPY_START_POSITION;

  game: FlappyGameModel;

  constructor(game: FlappyGameModel) {
    this.game = game;
  }

  moveDown() {
    this.top++;
    if (this.top > FLAPPY_FIELD_HEIGHT - FLAPPY_FIELD_PADDING) {
      this.game.gameOver();
    }
  }

  moveTop() {
    this.top -= FLAPPY_STEP;
  }
}
