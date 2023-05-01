import { SolitaireCardsBlock } from './SolitaireCardsBlock';
import {
  cardNamesCount,
  ESolitaireCardNames,
  fieldsBlockCount,
  SolitaireCardsNames,
  SolitaireCardsSuites
} from '../constants';
import { TSolitaireCardCred } from '../types';
import { shuffleArray } from '../../../utils/helpers';
import { SolitaireCard } from './SolitaireCard';

export class SolitaireGame {
  deck: SolitaireCardsBlock | null = null;

  fieldBlocks: SolitaireCardsBlock[] = [];

  resultBlocks: SolitaireCardsBlock[] = [];

  startGame() {
    const cardsArray: TSolitaireCardCred[] = [];
    SolitaireCardsSuites.forEach((suite) => {
      SolitaireCardsNames.forEach((name) => {
        cardsArray.push({
          name,
          suite
        });
      });
    });
    shuffleArray(cardsArray);
    for (let i = 0; i < fieldsBlockCount; i++) {
      const arr: TSolitaireCardCred[] = [];
      const num = i + 1;
      for (let j = 0; j < num; j++) {
        arr.push(cardsArray.pop()!);
      }
      this.fieldBlocks.push(new SolitaireCardsBlock(arr));
    }
    this.resultBlocks = [
      new SolitaireCardsBlock([]),
      new SolitaireCardsBlock([]),
      new SolitaireCardsBlock([]),
      new SolitaireCardsBlock([])
    ];
    this.deck = new SolitaireCardsBlock(cardsArray);
    this.deck.cards.forEach((card) => {
      card.isOpened = true;
    });
  }

  // eslint-disable-next-line class-methods-use-this
  changeBlockForCards(newBlock: SolitaireCardsBlock, cardArr: SolitaireCard[]) {
    if (
      !newBlock.cards.length &&
      cardArr[0]?.name !== ESolitaireCardNames.KING
    ) {
      return;
    }
    const newBlockLastCard = newBlock.cards[newBlock.cards.length - 1];
    if (newBlockLastCard) {
      const firstCardFromArr = cardArr[0];
      if (
        newBlockLastCard.value - firstCardFromArr.value !== 1 ||
        newBlockLastCard.color === firstCardFromArr.color
      ) {
        return;
      }
    }
    const prevBlock = cardArr[0]?.block;
    cardArr.forEach((card) => {
      card.changeBlock(newBlock);
    });
    if (prevBlock) {
      const lastCard = prevBlock.cards[prevBlock.cards.length - 1];
      if (lastCard) {
        lastCard.isOpened = true;
      }
    }
  }

  addToResultBlock(card: SolitaireCard) {
    const prevBlock = card.block;
    if (card.block.cards.indexOf(card) !== card.block.cards.length - 1) {
      return;
    }
    if (card.name === ESolitaireCardNames.ACE) {
      const freeBlock = this.resultBlocks.find((block) => !block.cards.length);
      if (freeBlock) {
        card.changeBlock(freeBlock);
      }
    } else {
      const block = this.resultBlocks.find(
        (resultBlock) =>
          resultBlock.cards[0]?.suit === card.suit &&
          resultBlock.cards[resultBlock.cards.length - 1]?.value &&
          card.value - resultBlock.cards[resultBlock.cards.length - 1].value ===
            1
      );
      if (block) {
        card.changeBlock(block);
      }
    }
    if (prevBlock) {
      const lastCard = prevBlock.cards[prevBlock.cards.length - 1];
      if (lastCard) {
        lastCard.isOpened = true;
      }
    }
  }

  swapCardsInDeck() {
    if (this.deck?.cards.length) {
      const currentCard = this.deck?.cards.pop();
      if (currentCard) {
        this.deck.cards.unshift(currentCard);
      }
    }
  }

  checkWinner() {
    return this.resultBlocks.every(
      (block) => block.cards.length === cardNamesCount
    );
  }
}
