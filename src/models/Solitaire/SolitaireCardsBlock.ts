import { v4 as uuidv4 } from 'uuid';
import { SolitaireCard } from './SolitaireCard';
import { TSolitaireCardCred } from '../../types/solitaire-types';

export class SolitaireCardsBlock {
  cards: SolitaireCard[] = [];

  id: string;

  constructor(cardsArr: TSolitaireCardCred[]) {
    this.id = uuidv4();
    cardsArr.forEach((card, index) => {
      const isOpened = index === cardsArr.length - 1;
      this.cards.push(new SolitaireCard(card.name, card.suite, this, isOpened));
    });
  }
}
