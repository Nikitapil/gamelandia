import {
  AIM_FIELD_HEIGHT,
  AIM_FIELD_WIDTH,
  MAX_AIM_SIZE
} from '../../constants/aim-game';

export class AimModel {
  size: number;

  top: number;

  left: number;

  constructor() {
    this.size = Math.floor(Math.random() * MAX_AIM_SIZE + (MAX_AIM_SIZE - 1));
    this.top = Math.floor(Math.random() * (AIM_FIELD_HEIGHT - this.size));
    this.left = Math.floor(Math.random() * (AIM_FIELD_WIDTH - this.size));
  }
}
