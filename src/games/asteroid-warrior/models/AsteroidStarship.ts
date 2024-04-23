import {
  CanvasTemplateRenderer,
  ICanvasTemplateRendererParams
} from '../../models/canvas/CanvasTemplateRenderer';

import { STARSHIP_SPEED } from '../constants';

interface IAsteroidStarshipParams extends ICanvasTemplateRendererParams {
  canvasWidth: number;
  canvasHeight: number;
}

export class AsteroidStarship extends CanvasTemplateRenderer {
  x: number;

  y: number;

  verticalSpeed = 0;

  horizontalSpeed = 0;

  canvasHeight: number;

  canvasWidth: number;

  starshipHeight: number;

  starshipWidth: number;

  constructor({
    canvas,
    template,
    colorMap,
    sizeCoef,
    canvasWidth,
    canvasHeight
  }: IAsteroidStarshipParams) {
    super({ canvas, template, colorMap, sizeCoef });

    this.starshipHeight = template.length * sizeCoef;
    this.starshipWidth = template[0].length * sizeCoef;

    this.x = canvasWidth * 0.1;
    this.y = canvasHeight / 2 - this.starshipHeight;

    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
  }

  setSpeed(directionKey: string, stop: boolean) {
    if (directionKey === 'ArrowUp') {
      this.verticalSpeed = stop ? 0 : -STARSHIP_SPEED;
    } else if (directionKey === 'ArrowDown') {
      this.verticalSpeed = stop ? 0 : STARSHIP_SPEED;
    } else if (directionKey === 'ArrowLeft') {
      this.horizontalSpeed = stop ? 0 : -STARSHIP_SPEED;
    } else if (directionKey === 'ArrowRight') {
      this.horizontalSpeed = stop ? 0 : STARSHIP_SPEED;
    }
  }

  private setCords() {
    if (this.verticalSpeed < 0) {
      this.y = this.y <= 0 ? this.y : this.y + this.verticalSpeed;
    }
    if (this.verticalSpeed > 0) {
      this.y =
        this.y + this.starshipHeight >= this.canvasHeight ? this.y : this.y + this.verticalSpeed;
    }

    if (this.horizontalSpeed < 0) {
      this.x = this.x <= 0 ? this.x : this.x + this.horizontalSpeed;
    }
    if (this.horizontalSpeed > 0) {
      this.x =
        this.x + this.starshipWidth >= this.canvasWidth ? this.x : this.x + this.horizontalSpeed;
    }
  }

  render() {
    this.setCords();
    super.render({ x: this.x, y: this.y });
  }
}
