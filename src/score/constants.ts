import { IAppRadioButtonOption } from '../components/UI/AppRadioButton/types';
import { EGamesLevels } from '../games/constants';

export const scoreLevelOptions: IAppRadioButtonOption<EGamesLevels>[] = [
  {
    text: 'Easy',
    value: EGamesLevels.EASY
  },
  {
    text: 'Medium',
    value: EGamesLevels.MEDIUM
  },
  {
    text: 'Hard',
    value: EGamesLevels.HARD
  }
];
