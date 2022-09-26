import { FLAPPY_FIELD_HEIGHT } from '../../constants/flappy';
import { FlappyGameModel } from './FlappyGameModel';

export class FlappyBirdModel {
  top: number = 400;

  game: FlappyGameModel;

  constructor(game: FlappyGameModel) {
    this.game = game;
  }

  moveDown() {
    this.top++;
    if (this.top > FLAPPY_FIELD_HEIGHT - 10) {
      this.game.gameOver();
    }
  }

  moveTop() {
    this.top -= 35;
  }
}
