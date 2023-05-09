import { AIM_FIELD_HEIGHT, AIM_FIELD_WIDTH, MAX_AIM_SIZE } from '../constants';
import { getRandomIntegerWithoutMaxValue } from '../../../utils/helpers';

export class AimModel {
  size: number;

  top: number;

  left: number;

  constructor() {
    this.size = Math.floor(Math.random() * MAX_AIM_SIZE + (MAX_AIM_SIZE - 1));
    this.top = getRandomIntegerWithoutMaxValue(AIM_FIELD_HEIGHT - this.size);
    this.left = getRandomIntegerWithoutMaxValue(AIM_FIELD_WIDTH - this.size);
  }
}
