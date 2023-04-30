import { IAppRadioButtonOption } from '../components/UI/AppRadioButton/types';
import { EGamesLevels } from './games';

export enum ESnakeDirections {
  RIGHT = 'RIGHT',
  LEFT = 'LEFT',
  TOP = 'TOP',
  BOTTOM = 'BOTTOM'
}

export const snakeLevelsOptions: IAppRadioButtonOption<TSnakeLevels>[] = [
  {
    text: 'Easy',
    value: 150
  },
  {
    text: 'Medium',
    value: 100
  },
  {
    text: 'Hard',
    value: 50
  }
];

export const snakeLevels = {
  150: EGamesLevels.EASY,
  100: EGamesLevels.MEDIUM,
  50: EGamesLevels.HARD
};

export type TSnakeLevels = 150 | 100 | 50;
