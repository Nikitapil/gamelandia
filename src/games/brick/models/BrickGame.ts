import {
  BALL_COLOR,
  BALL_RADIUS,
  BRICK_COLOR,
  BRICK_COLUMN_COUNT,
  BRICK_HEIGHT,
  BRICK_ROW_COUNT,
  BRICK_WIDTH,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  PADDLE_COLOR,
  PADDLE_HEIGHT,
  PADDLE_VELOCITY,
  PADDLE_WIDTH,
  PADDLE_Y_POSITION,
  START_BALL_X_POSITION,
  START_BALL_X_VELOCITY,
  START_BALL_Y_POSITION,
  START_BALL_Y_VELOCITY,
  START_PADDLE_X_POSITION
} from '../constants';
import { Brick } from './Brick';

export class BrickGameModel {
  ballXPosition = START_BALL_X_POSITION;

  ballYPosition = START_BALL_Y_POSITION;

  ballXVelocity = START_BALL_X_VELOCITY;

  ballYVelocity = START_BALL_Y_VELOCITY;

  paddleXPosition = START_PADDLE_X_POSITION;

  bricks: Brick[][] = [];

  score = 0;

  lives = 3;

  isGameRunning = false;

  ctx: CanvasRenderingContext2D | null;

  isPaddleMoveRight = false;

  isPaddleMoveLeft = false;

  animationFrameId = 0;

  updateCallback: (model: BrickGameModel) => void;

  constructor(canvas: HTMLCanvasElement, updateCallback: (model: BrickGameModel) => void) {
    this.ctx = canvas.getContext('2d');
    this.updateCallback = updateCallback;
  }

  private setStartValues = () => {
    this.ballXPosition = START_BALL_X_POSITION;
    this.ballYPosition = START_BALL_Y_POSITION;
    this.ballXVelocity = START_BALL_X_VELOCITY;
    this.ballYVelocity = START_BALL_Y_VELOCITY;
    this.paddleXPosition = START_PADDLE_X_POSITION;
  };

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

  private drawBricks() {
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
  }

  private checkPaddleCollision() {
    if (
      this.ballXPosition > this.paddleXPosition &&
      this.ballXPosition < this.paddleXPosition + PADDLE_WIDTH
    ) {
      this.ballYVelocity = -this.ballYVelocity;
      return true;
    }
  }

  private checkBottomCollision() {
    if (!this.ctx) {
      return;
    }
    this.lives--;
    if (!this.lives) {
      this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      this.isGameRunning = false;
    } else {
      this.setStartValues();
    }
  }

  private checkBrickCollision() {
    for (let i = 0; i < BRICK_COLUMN_COUNT; i++) {
      for (let j = 0; j < BRICK_ROW_COUNT; j++) {
        const currentBrick = this.bricks[i][j];
        if (!currentBrick.isVisible) {
          continue;
        }
        const xCollision =
          this.ballXPosition > currentBrick.x && this.ballXPosition < currentBrick.x + BRICK_WIDTH;
        const yCollision =
          this.ballYPosition > currentBrick.y && this.ballYPosition < currentBrick.y + BRICK_HEIGHT;
        if (xCollision && yCollision) {
          this.ballYVelocity = -this.ballYVelocity;
          currentBrick.isVisible = false;
          this.score++;
          this.updateCallback(this);
        }
      }
    }
  }

  private bounceBorders() {
    const nextXPosition = this.ballXPosition + this.ballXVelocity;
    const nextYPosition = this.ballYPosition + this.ballYVelocity;
    if (nextXPosition < BALL_RADIUS || nextXPosition > CANVAS_WIDTH - BALL_RADIUS) {
      this.ballXVelocity = -this.ballXVelocity;
    } else if (nextYPosition < BALL_RADIUS) {
      this.ballYVelocity = -this.ballYVelocity;
    } else if (nextYPosition > CANVAS_HEIGHT - BALL_RADIUS) {
      if (!this.checkPaddleCollision()) {
        this.checkBottomCollision();
      }
    }
  }

  private movePaddle() {
    if (this.isPaddleMoveRight) {
      this.paddleXPosition = Math.min(
        this.paddleXPosition + PADDLE_VELOCITY,
        CANVAS_WIDTH - PADDLE_WIDTH
      );
    } else if (this.isPaddleMoveLeft) {
      this.paddleXPosition = Math.max(this.paddleXPosition - PADDLE_VELOCITY, 0);
    }
  }

  private checkIfAllBricksOut() {
    return this.bricks.every((row) => row.every((brick) => !brick.isVisible));
  }

  private checkIfNextLevel() {
    if (this.ctx && this.bricks.length && this.checkIfAllBricksOut()) {
      this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      this.isGameRunning = false;
      this.startGame();
    }
  }

  private draw = () => {
    if (!this.isGameRunning || !this.ctx) {
      return;
    }
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.drawBricks();
    this.drawBall();
    this.drawPaddle();
    this.bounceBorders();
    this.movePaddle();
    this.checkBrickCollision();
    this.checkIfNextLevel();
    this.ballXPosition += this.ballXVelocity;
    this.ballYPosition += this.ballYVelocity;
    this.animationFrameId = requestAnimationFrame(this.draw);
  };

  startGame = () => {
    this.isGameRunning = true;
    this.fillBricksArray();
    this.draw();
  };
}
