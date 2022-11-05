import { DynoCactusModel } from './DynoCactusModel';
import { getRandomBoolean } from '../../utils/helpers';

export class DynoGameModel {
  cactuses: DynoCactusModel[] = [];

  isMobile: boolean;

  fieldWidth: number;

  constructor(fieldWidth: number, isMobile: boolean = true) {
    this.fieldWidth = fieldWidth;
    this.isMobile = isMobile;
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
    const newGame = new DynoGameModel(this.fieldWidth);
    newGame.cactuses = [...this.cactuses];
    return newGame;
  }
}
