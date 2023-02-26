import { TSolitaireCardNameValues } from '../types/solitaire-types';

export enum ESolitaireSuites {
  DIAMONDS = 'diamonds',
  HEARTS = 'hearts',
  CLUBS = 'clubs',
  SPADES = 'spades'
}

export enum ESolitaireCardNames {
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
  NINE = '9',
  TEN = '10',
  JACK = 'J',
  QUEEN = 'Q',
  KING = 'K',
  ACE = 'A'
}

export enum ESolitaireCardsColors {
  RED = 'red',
  BLACK = 'black'
}

export const nameValues: TSolitaireCardNameValues = {
  [ESolitaireCardNames.TWO]: 2,
  [ESolitaireCardNames.THREE]: 3,
  [ESolitaireCardNames.FOUR]: 4,
  [ESolitaireCardNames.FIVE]: 5,
  [ESolitaireCardNames.SIX]: 6,
  [ESolitaireCardNames.SEVEN]: 7,
  [ESolitaireCardNames.EIGHT]: 8,
  [ESolitaireCardNames.NINE]: 9,
  [ESolitaireCardNames.TEN]: 10,
  [ESolitaireCardNames.JACK]: 11,
  [ESolitaireCardNames.QUEEN]: 12,
  [ESolitaireCardNames.KING]: 13,
  [ESolitaireCardNames.ACE]: 1
};

export const SolitaireCardsSuites = [
  ESolitaireSuites.HEARTS,
  ESolitaireSuites.DIAMONDS,
  ESolitaireSuites.CLUBS,
  ESolitaireSuites.SPADES
];

export const SolitaireCardsNames = [
  ESolitaireCardNames.TWO,
  ESolitaireCardNames.THREE,
  ESolitaireCardNames.FOUR,
  ESolitaireCardNames.FIVE,
  ESolitaireCardNames.SIX,
  ESolitaireCardNames.SEVEN,
  ESolitaireCardNames.EIGHT,
  ESolitaireCardNames.NINE,
  ESolitaireCardNames.TEN,
  ESolitaireCardNames.JACK,
  ESolitaireCardNames.QUEEN,
  ESolitaireCardNames.KING,
  ESolitaireCardNames.ACE
];

export const fieldsBlockCount = 7;
export const cardNamesCount = 13;
