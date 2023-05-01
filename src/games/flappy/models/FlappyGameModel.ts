import { FlappyPipeModel } from './FlappyPipeModel';
import {
  FLAPPY_BIRD_HEIGHT,
  FLAPPY_BIRD_TOP_FAULT,
  FLAPPY_FIELD_HEIGHT,
  FLAPPY_INTERSECTION_END,
  FLAPPY_INTERSECTION_START,
  FLAPPY_PIPES_BETWEEN_FACTOR,
  PIPE_WIDTH
} from '../constants';
import { FlappyBirdModel } from './FlappyBirdModel';

export class FlappyGameModel {
  pipes: FlappyPipeModel[] = [];

  isGameOver = false;

  bird: FlappyBirdModel = new FlappyBirdModel(this);

  score = 0;

  startGame() {
    this.addNewPipe();
  }

  removeFirstPipe() {
    this.pipes.shift();
  }

  movePipes() {
    this.pipes.forEach((pipe) => pipe.move());
    if (
      this.pipes[this.pipes.length - 1]?.right >
      PIPE_WIDTH * FLAPPY_PIPES_BETWEEN_FACTOR
    ) {
      this.addNewPipe();
    }
  }

  addNewPipe() {
    this.pipes.push(new FlappyPipeModel(this));
  }

  gameOver() {
    this.isGameOver = true;
    this.pipes = [];
  }

  getGameCopy() {
    const newGame = new FlappyGameModel();
    newGame.pipes = this.pipes;
    newGame.bird = this.bird;
    newGame.isGameOver = this.isGameOver;
    newGame.score = this.score;
    return newGame;
  }

  updateScore() {
    if (this.pipes[0]?.right === FLAPPY_INTERSECTION_END) {
      this.score++;
    }
  }

  checkIfGameOver() {
    for (let i = 0; i < this.pipes.length; i++) {
      const pipe = this.pipes[i];
      if (
        pipe.right > FLAPPY_INTERSECTION_START &&
        pipe.right < FLAPPY_INTERSECTION_END &&
        (this.bird.top + FLAPPY_BIRD_HEIGHT >=
          FLAPPY_FIELD_HEIGHT - pipe.bottomHeight ||
          this.bird.top <= pipe.topHeight + FLAPPY_BIRD_TOP_FAULT)
      ) {
        this.gameOver();
      }
    }
  }
}
