export class AimModel {
  size: number;

  top: number;

  left: number;

  constructor() {
    this.size = Math.floor(Math.random() * 11 + 10);
    this.top = Math.floor(Math.random() * (350 - this.size));
    this.left = Math.floor(Math.random() * (300 - this.size));
  }
}
