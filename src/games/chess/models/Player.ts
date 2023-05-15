import { EChessColors } from './EChessColors';

export class Player {
  color: EChessColors;

  constructor(color: EChessColors) {
    this.color = color;
  }
}
