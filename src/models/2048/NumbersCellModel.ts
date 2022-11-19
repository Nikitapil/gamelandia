import { v4 as uuidv4 } from 'uuid';
import { NumbersElemModel } from './NumbersElemModel';

export class NumbersCellModel {
  y: number;

  x: number;

  id: string;

  elem: NumbersElemModel | null = null;

  constructor(y: number, x: number) {
    this.y = y;
    this.x = x;
    this.id = uuidv4();
  }

  get isEmpty() {
    return !this.elem;
  }
}
