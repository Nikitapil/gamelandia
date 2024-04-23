export class CanvasModel {
  ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Canvas must be defined');
    }
    this.ctx = context;
  }
}
