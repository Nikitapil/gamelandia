import {
  FLAPPY_DIFFERENCE_HEIGHT,
  FLAPPY_FIELD_HEIGHT,
  FLAPPY_FIELD_WIDTH,
  MAX_PIPE_HEIGHT,
  MIN_PIPE_HEIGHT,
  PIPE_WIDTH
} from '../constants';
import { FlappyGameModel } from './FlappyGameModel';

export class FlappyPipeModel {
  topHeight: number;

  bottomHeight: number;

  right: number;

  game: FlappyGameModel;

  constructor(game: FlappyGameModel) {
    this.topHeight = Math.floor(Math.random() * MAX_PIPE_HEIGHT + MIN_PIPE_HEIGHT);
    this.bottomHeight = FLAPPY_FIELD_HEIGHT - this.topHeight - FLAPPY_DIFFERENCE_HEIGHT;
    this.right = 0;
    this.game = game;
  }

  move() {
    this.right += 1;
    if (this.right > FLAPPY_FIELD_WIDTH + PIPE_WIDTH) {
      this.game.removeFirstPipe();
    }
  }
}
