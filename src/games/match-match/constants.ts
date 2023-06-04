import { v4 as uuidv4 } from 'uuid';
import birds from './assets/card-images/birds.jpeg';
import dog from './assets/card-images/dog.jpeg';
import cat from './assets/card-images/cat.jpeg';
import donkey from './assets/card-images/donkey.jpeg';
import fox from './assets/card-images/fox.png';
import ghost from './assets/card-images/ghost.png';
import giene from './assets/card-images/giene.jpeg';
import littledog from './assets/card-images/littledog.jpeg';
import racoon from './assets/card-images/racoon.jpeg';
import wolf from './assets/card-images/wolf.png';
import { ICard } from './types';

export const matchMatchPics: ICard[] = [
  {
    name: 'birds',
    pic: birds,
    flipped: false,
    disabled: false,
    id: uuidv4()
  },
  {
    name: 'dog',
    pic: dog,
    flipped: false,
    disabled: false,
    id: uuidv4()
  },
  {
    name: 'cat',
    pic: cat,
    flipped: false,
    disabled: false,
    id: uuidv4()
  },
  {
    name: 'donkey',
    pic: donkey,
    flipped: false,
    disabled: false,
    id: uuidv4()
  },
  {
    name: 'fox',
    pic: fox,
    flipped: false,
    disabled: false,
    id: uuidv4()
  },
  {
    name: 'ghost',
    pic: ghost,
    flipped: false,
    disabled: false,
    id: uuidv4()
  },
  {
    name: 'giene',
    pic: giene,
    flipped: false,
    disabled: false,
    id: uuidv4()
  },
  {
    name: 'littledog',
    pic: littledog,
    flipped: false,
    disabled: false,
    id: uuidv4()
  },
  {
    name: 'racoon',
    pic: racoon,
    flipped: false,
    disabled: false,
    id: uuidv4()
  },
  {
    name: 'wolf',
    pic: wolf,
    flipped: false,
    disabled: false,
    id: uuidv4()
  }
];
