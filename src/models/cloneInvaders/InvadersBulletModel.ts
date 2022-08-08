export class InvadersBulletModel {
  y = 30;
  x: number;
  isDestroyed = false;
  constructor(x: number) {
    this.x = x;
  }

  move() {
    this.y += 5;
  }

  copyBullet() {
    const newBullet = new InvadersBulletModel(this.x);
    newBullet.y = this.y;
    return newBullet;
  }

  destroy() {
    this.isDestroyed = true;
  }
}
