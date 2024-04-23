import { CanvasModel } from '../../models/canvas/CanvasModel';

import { ICoordsModel } from '../../../types/common';

import { SHOT_HEIGHT, SHOT_SPEED, SHOT_WIDTH } from '../constants';

export class AsteroidShots extends CanvasModel {
  shots: ICoordsModel[] = [];

  canvasWidth: number;

  constructor(canvas: HTMLCanvasElement, canvasWidth: number) {
    super(canvas);
    this.canvasWidth = canvasWidth + SHOT_WIDTH;
  }

  addShot(shot: ICoordsModel) {
    this.shots.push(shot);
  }

  private renderShot({ x, y }: ICoordsModel) {
    this.ctx.fillStyle = 'yellow';
    this.ctx.fillRect(x, y, SHOT_WIDTH, SHOT_HEIGHT);
  }

  destroyShot(index: number) {
    this.shots.splice(index, 1);
  }

  moveShots() {
    this.shots.forEach((shot, index) => {
      if (shot.x < this.canvasWidth) {
        shot.x += SHOT_SPEED;
        this.renderShot({ x: shot.x, y: shot.y });
      } else {
        this.destroyShot(index);
      }
    });
  }
}
