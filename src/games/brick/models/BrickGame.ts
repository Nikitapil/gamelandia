import {
  BALL_COLOR,
  BALL_RADIUS, BRICK_COLOR,
  BRICK_COLUMN_COUNT, BRICK_HEIGHT,
  BRICK_ROW_COUNT, BRICK_WIDTH,
  PADDLE_COLOR,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  PADDLE_Y_POSITION,
  START_BALL_X_POSITION,
  START_BALL_X_VELOCITY,
  START_BALL_Y_POSITION,
  START_BALL_Y_VELOCITY,
  START_PADDLE_X_POSITION
} from '../constants';
import { Brick } from './Brick';

export class BrickGame {
  ballXPosition = START_BALL_X_POSITION;

  ballYPosition = START_BALL_Y_POSITION;

  ballXVelocity = START_BALL_X_VELOCITY;

  ballYVelocity = START_BALL_Y_VELOCITY;

  paddleXPosition = START_PADDLE_X_POSITION;

  bricks: Brick[][] = [];

  score = 0;

  lives = 0;

  isGameRunning = false;

  ctx: CanvasRenderingContext2D | null;

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d');
  }

  private fillBricksArray() {
    this.bricks = [];
    for (let i = 0; i < BRICK_COLUMN_COUNT; i++) {
      const temp = [];
      for (let j = 0; j < BRICK_ROW_COUNT; j++) {
        temp.push(new Brick(i, j));
      }
      this.bricks.push(temp);
    }
  }

  private drawBall() {
    if (!this.ctx) {
      return;
    }
    this.ctx.beginPath();
    this.ctx.fillStyle = BALL_COLOR;
    this.ctx.arc(this.ballXPosition, this.ballYPosition, BALL_RADIUS, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }

  private drawPaddle() {
    if (!this.ctx) {
      return;
    }
    this.ctx.fillStyle = PADDLE_COLOR;
    this.ctx.fillRect(this.paddleXPosition, PADDLE_Y_POSITION, PADDLE_WIDTH, PADDLE_HEIGHT);
  }

  private drawBricks = () => {
    if (!this.ctx) {
      return;
    }
    for (let i = 0; i < BRICK_COLUMN_COUNT; i++) {
      for (let j = 0; j < BRICK_ROW_COUNT; j++) {
        const currentBrick = this.bricks[i][j];
        if (!currentBrick.isVisible) {
          continue;
        }
        this.ctx.fillStyle = BRICK_COLOR;
        this.ctx.fillRect(currentBrick.x, currentBrick.y, BRICK_WIDTH, BRICK_HEIGHT);
      }
    }
  };
}
