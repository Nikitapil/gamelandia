import { DynoCactusModel } from './DynoCactusModel';
import { getRandomBoolean } from '../../../utils/helpers';
import { DYNO_FIELD_WIDTH } from '../constants';

export class DynoGameModel {
  cactuses: DynoCactusModel[] = [];

  fieldWidth: number;

  constructor() {
    this.fieldWidth = DYNO_FIELD_WIDTH;
  }

  moveCactuses() {
    this.cactuses.forEach((cactus) => {
      cactus.move();
      if (
        this.cactuses[this.cactuses.length - 1]?.right > this.fieldWidth / 2 &&
        getRandomBoolean()
      ) {
        this.addCactus();
      }
      if (this.cactuses[0]?.right > this.fieldWidth) {
        this.cactuses.shift();
      }
    });
  }

  addCactus() {
    this.cactuses.push(new DynoCactusModel());
  }

  startGame() {
    this.addCactus();
  }

  getCopyGame() {
    const newGame = new DynoGameModel();
    newGame.cactuses = [...this.cactuses];
    return newGame;
  }
}
