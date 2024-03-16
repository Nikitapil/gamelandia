interface ILifeCellConstructorParams {
  x: number;
  y: number;
}

export class LifeCell {
  x: number;

  y: number;

  isAlive = false;

  constructor({ x, y }: ILifeCellConstructorParams) {
    this.x = x;
    this.y = y;
  }

  get id() {
    return `${this.y}_${this.x}`;
  }

  setIsAlive(value: boolean) {
    this.isAlive = value;
  }
}
