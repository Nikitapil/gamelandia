import { FlappyPipeModel } from './FlappyPipeModel';
import { PIPE_WIDTH } from '../../constants/flappy';
import { FlappyBirdModel } from './FlappyBirdModel';

export class FlappyGameModel {
  pipes: FlappyPipeModel[] = [];

  isGameOver = false;

  bird: FlappyBirdModel = new FlappyBirdModel(this);

  startGame() {
    this.addNewPipe();
  }

  removeFirstPipe() {
    this.pipes.shift();
  }

  movePipes() {
    this.pipes.forEach((pipe) => pipe.move());
    if (this.pipes[this.pipes.length - 1]?.right > PIPE_WIDTH * 2.8) {
      this.addNewPipe();
    }
  }

  addNewPipe() {
    this.pipes.push(new FlappyPipeModel(this));
  }

  gameOver() {
    this.isGameOver = true;
  }

  getGameCopy() {
    const newGame = new FlappyGameModel();
    newGame.pipes = this.pipes;
    newGame.bird = this.bird;
    newGame.isGameOver = this.isGameOver;
    return newGame;
  }
}
