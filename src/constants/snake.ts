export enum ESnakeDirections {
  RIGHT = "RIGHT",
  LEFT = "LEFT",
  TOP = "TOP",
  BOTTOM = "BOTTOM",
}

export interface ISnakelevels {
  150: string;
  100: string;
  50: string;
}

export const snakeLevels: ISnakelevels = {
  150: "easy",
  100: "medium",
  50: "hard",
};