import { ESolitaireCardNames, ESolitaireSuites } from './constants';

export type TSolitaireCardValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export type TSolitaireCardId = `${ESolitaireCardNames}-${ESolitaireSuites}`;
export type TSolitaireCardNameValues = {
  [key: string]: TSolitaireCardValue;
};

export type TSolitaireCardCred = {
  name: ESolitaireCardNames;
  suite: ESolitaireSuites;
};
