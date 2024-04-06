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

  isPaddleMoveRight = false;

  isPaddleMoveLeft = false;

  bricks: Brick[][] = [];

  score = 0;

  lives = 3;

  ctx: CanvasRenderingContext2D | null;

  animationFrameId = 0;

  isGameRunning = false;

  isGameOver = false;

  private readonly updateCallback: (model: BrickGameModel) => void;

  constructor(canvas: HTMLCanvasElement, updateCallback: (model: BrickGameModel) => void) {
    this.ctx = canvas.getContext('2d');
    this.clear();
    this.updateCallback = updateCallback;
    this.fillBricksArray();
    this.drawBricks();
    this.drawBall();
    this.drawPaddle();
    this.update();
  }

  private update() {
    this.updateCallback(this);
  }

  private clear() {
    if (!this.ctx) {
      return;
    }
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  private cancelAnimation() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private drawText(text: string) {
    if (!this.ctx) {
      return;
    }
    this.ctx.font = '48px serif';
    this.ctx.fillText(text, CANVAS_WIDTH / 3.7, CANVAS_HEIGHT / 3);
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

  private changeBallYDirection() {
    this.ballYVelocity = -this.ballYVelocity;
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
      this.changeBallYDirection();
      return true;
    }
    return false;
  }

  private checkBottomCollision() {
    if (!this.ctx) {
      return;
    }
    this.lives--;
    if (!this.lives) {
      this.clear();
      this.isGameRunning = false;
      this.cancelAnimation();
      this.isGameOver = true;
      this.drawText('Game Over!!!');
    } else {
      this.setStartValues();
    }
    this.update();
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
          this.changeBallYDirection();
          currentBrick.isVisible = false;
          this.score++;
          this.update();
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
      this.changeBallYDirection();
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
      this.clear();
      this.isGameRunning = false;
      this.setStartValues();
      this.startGame();
    }
  }

  private draw = () => {
    if (!this.isGameRunning || !this.ctx) {
      return;
    }
    this.cancelAnimation();
    this.clear();
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
