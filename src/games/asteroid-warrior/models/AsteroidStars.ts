import { CanvasModel } from '../../models/canvas/CanvasModel';
import { ICoordsModel } from '../../../types/common';
import { getRandomIntegerWithoutMaxValue } from '../../../utils/helpers';
import { STAR_HEIGHT, STAR_WIDTH, STARS_SPEED } from '../constants';

interface IAsteroidStarsParams {
  canvas: HTMLCanvasElement;
  canvasWidth: number;
  canvasHeight: number;
}

export class AsteroidStars extends CanvasModel {
  private stars: ICoordsModel[] = [];

  private readonly canvasWidth: number;

  private readonly canvasHeight: number;

  constructor({ canvas, canvasWidth, canvasHeight }: IAsteroidStarsParams) {
    super(canvas);
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.generateStars();
  }

  private generateStars() {
    for (let y = 0; y < this.canvasHeight; y++) {
      for (let x = 0; x < this.canvasWidth; x++) {
        const random = getRandomIntegerWithoutMaxValue(1000);
        if (random === 100) {
          this.stars.push({ y, x });
        }
      }
    }
  }

  private renderStar(x: number, y: number) {
    this.ctx.fillStyle = '#fff';

    this.ctx.fillRect(x, y, STAR_WIDTH, STAR_HEIGHT);
  }

  public moveStars() {
    this.stars.forEach((star) => {
      star.x -= STARS_SPEED;
      if (star.x < 0) {
        star.x = this.canvasWidth;
      }
      this.renderStar(star.x, star.y);
    });
  }
}
