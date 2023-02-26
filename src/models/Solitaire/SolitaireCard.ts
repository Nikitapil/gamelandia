import {
  ESolitaireCardNames,
  ESolitaireCardsColors,
  ESolitaireSuites,
  nameValues
} from '../../constants/solitaire';
import {
  TSolitaireCardId,
  TSolitaireCardValue
} from '../../types/solitaire-types';
import { SolitaireCardsBlock } from './SolitaireCardsBlock';

export class SolitaireCard {
  name: ESolitaireCardNames;

  suit: ESolitaireSuites;

  value: TSolitaireCardValue;

  id: TSolitaireCardId;

  block: SolitaireCardsBlock;

  isOpened: boolean = false;

  color: ESolitaireCardsColors;

  constructor(
    name: ESolitaireCardNames,
    suit: ESolitaireSuites,
    block: SolitaireCardsBlock,
    isOpened: boolean
  ) {
    this.name = name;
    this.suit = suit;
    this.block = block;
    this.isOpened = isOpened;
    this.value = nameValues[this.name];
    this.color =
      suit === ESolitaireSuites.CLUBS || suit === ESolitaireSuites.SPADES
        ? ESolitaireCardsColors.BLACK
        : ESolitaireCardsColors.RED;
    this.id = `${name}-${suit}`;
  }

  changeBlock(newBlock: SolitaireCardsBlock) {
    this.block.cards = this.block.cards.filter((card) => card.id !== this.id);
    newBlock.cards.push(this);
    this.block = newBlock;
  }
}
