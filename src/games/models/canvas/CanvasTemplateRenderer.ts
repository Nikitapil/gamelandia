import { CanvasModel } from './CanvasModel';

export interface ICanvasTemplateRendererParams {
  canvas: HTMLCanvasElement;
  template: number[][];
  colorMap: Record<number, string>;
  sizeCoef: number;
}

interface IRenderMethodParams {
  x: number;
  y: number;
}

export class CanvasTemplateRenderer extends CanvasModel {
  private readonly template: number[][];

  private readonly colorMap: Record<number, string>;

  private readonly sizeCoef: number;

  constructor({ canvas, template, colorMap, sizeCoef }: ICanvasTemplateRendererParams) {
    super(canvas);
    this.template = template;
    this.colorMap = colorMap;
    this.sizeCoef = sizeCoef;
  }

  render({ x, y }: IRenderMethodParams) {
    for (let i = 0; i < this.template.length; i++) {
      const row = this.template[i];
      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        if (cell !== 0) {
          this.ctx.fillStyle = this.colorMap[cell];
          this.ctx.fillRect(
            x + j * this.sizeCoef,
            y + i * this.sizeCoef,
            this.sizeCoef,
            this.sizeCoef
          );
        }
      }
    }
  }
}
