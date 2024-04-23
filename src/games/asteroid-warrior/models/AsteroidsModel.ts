import {
  CanvasTemplateRenderer,
  ICanvasTemplateRendererParams
} from '../../models/canvas/CanvasTemplateRenderer';
import { ICoordsModel } from '../../../types/common';
import { getRandomIntegerWithoutMaxValue } from '../../../utils/helpers';
import { ASTEROIDS_MIN_COUNT, ASTEROIDS_SPEED } from '../constants';

interface IAsteroidsModelParams extends ICanvasTemplateRendererParams {
  canvasWidth: number;
  canvasHeight: number;
}

interface IAsteroid extends ICoordsModel {
  initialX: number;
}

export class Asteroids extends CanvasTemplateRenderer {
  asteroids: IAsteroid[] = [];

  canvasHeight: number;

  canvasWidth: number;

  asteroidHeight: number;

  asteroidWidth: number;

  consistensy = 10000;

  constructor({
    canvas,
    template,
    sizeCoef,
    colorMap,
    canvasHeight,
    canvasWidth
  }: IAsteroidsModelParams) {
    super({ canvas, template, sizeCoef, colorMap });

    this.asteroidHeight = template.length * sizeCoef;
    this.asteroidWidth = template[0].length * sizeCoef;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight - this.asteroidHeight;

    this.generateAsteroids();
  }

  private generateAsteroids() {
    for (let y = 0; y < this.canvasHeight; y++) {
      for (let x = this.canvasWidth; x < this.canvasWidth * 5; x++) {
        const random = getRandomIntegerWithoutMaxValue(this.consistensy);
        if (random === 100) {
          this.asteroids.push({ y, x, initialX: x });
        }
      }
    }
  }

  destroyAsteroid(index: number) {
    this.asteroids.splice(index, 1);
  }

  moveAsteroid() {
    this.asteroids.forEach((asteroid) => {
      asteroid.x -= ASTEROIDS_SPEED;
      if (asteroid.x < 0) {
        asteroid.x = asteroid.initialX;
      }
      this.render({ x: asteroid.x, y: asteroid.y });
    });
    if (this.asteroids.length < ASTEROIDS_MIN_COUNT) {
      this.consistensy--;
      this.generateAsteroids();
    }
  }
}
