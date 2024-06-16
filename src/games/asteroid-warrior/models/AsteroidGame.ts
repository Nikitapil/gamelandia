import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  ASTEROID_GAME_FRAME_INTERVAL,
  STARSHIP_SIZE,
  ASTEROIDS_SIZE,
  MAX_HEALTH
} from '../constants';
import {
  STARSHIP_TEMPLATE_COLORS,
  STARSHIP_TEMPLATE_DEFAULT
} from '../canvas-templates/startshipTemplates';
import {
  ASTEROID_TEMPLATE_COLORS,
  ASTEROID_TEMPLATE_DEFAULT
} from '../canvas-templates/asteroidsTemplates';

import { TVoidFunction } from '../../../types/common';

import { CanvasModel } from '../../models/canvas/CanvasModel';
import { AsteroidStars } from './AsteroidStars';
import { AsteroidStarship } from './AsteroidStarship';
import { Asteroids } from './AsteroidsModel';
import { AsteroidShots } from './AsteroidShots';

export class AsteroidGame extends CanvasModel {
  starsModel: AsteroidStars;

  starShipModel: AsteroidStarship;

  asteroidsModel: Asteroids;

  shotsModel: AsteroidShots;

  health = MAX_HEALTH;

  score = 0;

  isGameOver = false;

  animationFrameId = 0;

  updateEmitter: (model: AsteroidGame) => void;

  constructor(canvas: HTMLCanvasElement, updateEmitter: (model: AsteroidGame) => void) {
    super(canvas);

    this.starsModel = new AsteroidStars({
      canvas,
      canvasWidth: CANVAS_WIDTH,
      canvasHeight: CANVAS_HEIGHT
    });

    this.starShipModel = new AsteroidStarship({
      canvas,
      template: STARSHIP_TEMPLATE_DEFAULT,
      colorMap: STARSHIP_TEMPLATE_COLORS,
      sizeCoef: STARSHIP_SIZE,
      canvasWidth: CANVAS_WIDTH,
      canvasHeight: CANVAS_HEIGHT
    });

    this.asteroidsModel = new Asteroids({
      canvas,
      template: ASTEROID_TEMPLATE_DEFAULT,
      colorMap: ASTEROID_TEMPLATE_COLORS,
      sizeCoef: ASTEROIDS_SIZE,
      canvasWidth: CANVAS_WIDTH,
      canvasHeight: CANVAS_HEIGHT
    });

    this.shotsModel = new AsteroidShots(canvas, CANVAS_WIDTH);
    this.updateEmitter = updateEmitter;
  }

  clearCanvas(): void {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  private getFrameIntervalFn(drawCallbacks: TVoidFunction[]) {
    let startTime = 0;

    const frameTimerFn = (timeStamp = 0) => {
      if (this.isGameOver) {
        return;
      }
      cancelAnimationFrame(this.animationFrameId);
      const delta = timeStamp - startTime;

      if (delta >= ASTEROID_GAME_FRAME_INTERVAL) {
        startTime = timeStamp;
        drawCallbacks.forEach((fn) => fn());
      }

      this.animationFrameId = requestAnimationFrame(frameTimerFn);
    };

    return frameTimerFn;
  }

  moveStarship(keyCode: string, stop: boolean) {
    this.starShipModel.setSpeed(keyCode, stop);
  }

  addShots() {
    this.shotsModel.addShot({
      x: this.starShipModel.x + this.starShipModel.starshipWidth - 10,
      y: this.starShipModel.y
    });
    this.shotsModel.addShot({
      x: this.starShipModel.x + this.starShipModel.starshipWidth - 10,
      y: this.starShipModel.y + this.starShipModel.starshipHeight - STARSHIP_SIZE
    });
  }

  checkAsteroidsIntersection() {
    const starShipYEnd = this.starShipModel.y + this.starShipModel.starshipHeight;
    const starShipXEnd = this.starShipModel.x + this.starShipModel.starshipWidth;

    for (let i = 0; i < this.asteroidsModel.asteroids.length; i++) {
      const asteroid = this.asteroidsModel.asteroids[i];
      const asteroidYEnd = asteroid.y + this.asteroidsModel.asteroidHeight;
      const asteroidXEnd = asteroid.x + this.asteroidsModel.asteroidWidth;

      if (
        this.starShipModel.y < asteroidYEnd &&
        starShipYEnd > asteroid.y &&
        starShipXEnd > asteroid.x &&
        this.starShipModel.x < asteroidXEnd
      ) {
        this.health--;
        if (this.health <= 0) {
          this.gameOver();
          return;
        }
      } else if (this.health < MAX_HEALTH) {
        this.health += 0.0002;
      }

      if (asteroid.x <= 0) {
        this.health -= 0.8;
      }
      const shotIndex = this.shotsModel.shots.findIndex(
        (shot) =>
          shot.x >= asteroid.x &&
          shot.x <= asteroidXEnd &&
          shot.y >= asteroid.y &&
          shot.y < asteroidYEnd
      );

      if (shotIndex >= 0) {
        this.shotsModel.destroyShot(shotIndex);
        this.asteroidsModel.destroyAsteroid(i);
        this.score++;
      }
      this.updateEmitter(this);
    }
  }

  play(): void {
    const framePlay = this.getFrameIntervalFn([
      () => this.clearCanvas(),
      () => this.starsModel.moveStars(),
      () => this.starShipModel.render(),
      () => this.asteroidsModel.moveAsteroid(),
      () => this.shotsModel.moveShots(),
      () => this.checkAsteroidsIntersection()
    ]);

    framePlay();
  }

  stopGame() {
    cancelAnimationFrame(this.animationFrameId);
  }

  gameOver(): void {
    this.isGameOver = true;
    cancelAnimationFrame(this.animationFrameId);
    this.clearCanvas();
    this.ctx.font = '48px serif';
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText('Game Over', CANVAS_WIDTH / 2.8, CANVAS_HEIGHT / 2);
    this.updateEmitter(this);
  }
}
