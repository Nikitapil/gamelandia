import { v4 as uuidv4 } from 'uuid';
import defaultPic from '../assets/gamepictures/default.png';
import birds from '../assets/matchMatch/birds.jpeg';
import cat from '../assets/matchMatch/cat.jpeg';
import dog from '../assets/matchMatch/dog.jpeg';
import donkey from '../assets/matchMatch/donkey.jpeg';
import fox from '../assets/matchMatch/fox.png';
import ghost from '../assets/matchMatch/ghost.png';
import wolf from '../assets/matchMatch/wolf.png';
import giene from '../assets/matchMatch/giene.jpeg';
import littledog from '../assets/matchMatch/littledog.jpeg';
import racoon from '../assets/matchMatch/racoon.jpeg';
import quizzer from '../assets/gamepictures/quizzer.png';
import chess from '../assets/gamepictures/chess.jpeg';
import ticTacToe from '../assets/gamepictures/ticTacToe.jpeg';
import snake from '../assets/gamepictures/snake.jpeg';
import battleship from '../assets/gamepictures/battleship.webp';
import tetris from '../assets/gamepictures/tetris.png';
import cloneInvaders from '../assets/cloneInvaders/cloneInvaders.webp';
import flappy from '../assets/gamepictures/flappy.png';
import aim from '../assets/gamepictures/aim.png';
import numbers from '../assets/gamepictures/2048.png';
import solitaire from '../assets/gamepictures/solitaire.jpeg';

interface IGamePics {
  [key: string]: string;
}

export const gamePics: IGamePics = {
  default: defaultPic,
  quizzer,
  chess,
  ticTacToe,
  snake,
  battleship,
  cloneInvaders,
  tetris,
  flappy,
  aim,
  numbers,
  solitaire
};

export const matchMatchPics = [
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
