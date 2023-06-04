import { v4 as uuidv4 } from 'uuid';

export class DynoCactusModel {
  right: number = 0;

  id: string;

  constructor() {
    this.id = uuidv4();
  }

  move() {
    this.right += 1;
  }
}
