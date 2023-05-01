import { SquareFigureModel } from './models/Figures/SquareFigureModel';
import { ITetrisFiguresObject } from './types';
import { LFigureLeftModel } from './models/Figures/LFigureLeftModel';
import { LFigureRightModel } from './models/Figures/LFigureRightModel';
import { TFigureModel } from './models/Figures/TFigureModel';
import { SkewFigureRightModel } from './models/Figures/SkewFigureRightModel';
import { SkewFigureLeftModel } from './models/Figures/SkewFigureLeftModel';
import { StraightFigureModel } from './models/Figures/StraightFigureModel';

export enum ETetrisColors {
  BLUE = 'blue',
  GREEN = 'green',
  YELLOW = 'yellow',
  ORANGE = 'orange',
  RED = 'red',
  WHITE = 'white',
  BLACK = 'black'
}

export enum ETetrisDirections {
  UP = 'up',
  DOWN = 'down',
  RIGHT = 'right',
  LEFT = 'left'
}

export const tetrisFigures: ITetrisFiguresObject = {
  tFigure: TFigureModel,
  lFigureLeft: LFigureLeftModel,
  lfigureRight: LFigureRightModel,
  squareFigure: SquareFigureModel,
  skewFigureRight: SkewFigureRightModel,
  skewFigureLeft: SkewFigureLeftModel,
  straightFigure: StraightFigureModel
};

export const T_FIGURE_POSSIBLE_DIRECTIONS = [
  ETetrisDirections.UP,
  ETetrisDirections.RIGHT,
  ETetrisDirections.DOWN,
  ETetrisDirections.LEFT
];
export const L_FIGURE_POSSIBLE_DIRECTIONS = [
  ETetrisDirections.UP,
  ETetrisDirections.RIGHT,
  ETetrisDirections.DOWN,
  ETetrisDirections.LEFT
];
export const SQUARE_FIGURE_POSSIBLE_DIRECTIONS = [ETetrisDirections.UP];
export const SKEW_FIGURE_POSSIBLE_DIRECTIONS = [
  ETetrisDirections.UP,
  ETetrisDirections.DOWN
];
export const STRAIGHT_FIGURE_POSSIBLE_DIRECTIONS = [
  ETetrisDirections.UP,
  ETetrisDirections.DOWN
];
