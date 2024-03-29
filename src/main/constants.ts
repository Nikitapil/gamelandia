import { ERoutes } from '../router/constants';
import { IGameCard } from './types';
import { IStringObject } from '../types/common';

import defaultPic from './assets/game-pictures/default.png';
import quizzer from './assets/game-pictures/quizzer.png';
import chess from './assets/game-pictures/chess.jpg';
import ticTacToe from './assets/game-pictures/ticTacToe.jpeg';
import snake from './assets/game-pictures/snake.jpg';
import battleship from './assets/game-pictures/battleship.jpg';
import cloneInvaders from './assets/game-pictures/clone-invaders.jpg';
import tetris from './assets/game-pictures/tetris.jpg';
import flappy from './assets/game-pictures/flappy.jpg';
import aim from './assets/game-pictures/aim.png';
import numbers from './assets/game-pictures/2048.png';
import solitaire from './assets/game-pictures/solitaire.jpeg';
import lifeGame from './assets/game-pictures/lifeGame.png';

export const gamesCards: IGameCard[] = [
  {
    id: 11,
    gameName: '2048',
    pictureName: 'numbers',
    description: 'numbers_description',
    path: ERoutes.NUMBERS,
    isOutside: false,
    labels: ['Single Player'],
    mobileSuitable: true
  },
  {
    id: 5,
    gameName: 'snake',
    pictureName: 'snake',
    description: 'snake_description',
    path: ERoutes.SNAKE,
    isOutside: false,
    labels: ['Single player'],
    mobileSuitable: true
  },
  {
    id: 6,
    gameName: 'battleship',
    pictureName: 'battleship',
    description: 'battleship_description',
    path: ERoutes.BATTLESHIP,
    isOutside: false,
    labels: ['Online', '2players'],
    mobileSuitable: true
  },
  {
    id: 3,
    gameName: 'chess',
    pictureName: 'chess',
    description: 'chess_description',
    path: ERoutes.CHESS,
    isOutside: false,
    labels: ['2 players', 'online', 'offline'],
    mobileSuitable: true
  },
  {
    id: 2,
    gameName: 'quizzer',
    pictureName: 'quizzer',
    description: 'quizzer_description',
    path: 'https://nikitapil.github.io/quizzer-app/',
    isOutside: true,
    labels: [],
    mobileSuitable: true
  },
  {
    id: 8,
    gameName: 'tetris',
    pictureName: 'tetris',
    description: 'tetris_description',
    path: ERoutes.TETRIS,
    isOutside: false,
    labels: ['offline', 'Single player'],
    mobileSuitable: true
  },
  {
    id: 14,
    gameName: 'solitaire',
    pictureName: 'solitaire',
    description: 'solitaire_description',
    path: ERoutes.SOLITAIRE,
    isOutside: false,
    labels: ['offline', 'Single player'],
    mobileSuitable: true
  },
  {
    id: 7,
    gameName: 'clone_invaders',
    pictureName: 'cloneInvaders',
    description: 'invaders_description',
    path: ERoutes.INVADERS,
    isOutside: false,
    labels: ['Single Player', 'Not suitable for mobile'],
    mobileSuitable: false
  },
  {
    id: 9,
    gameName: 'flappy_bird',
    pictureName: 'flappy',
    description: 'flappy_description',
    path: ERoutes.FLAPPY,
    isOutside: false,
    labels: ['Single player', 'Not suitable for mobile'],
    mobileSuitable: false
  },
  {
    id: 10,
    gameName: 'aim_game',
    pictureName: 'aim',
    description: 'aim_game_description',
    path: ERoutes.AIM_GAME,
    isOutside: false,
    labels: ['Single player'],
    mobileSuitable: true
  },
  {
    id: 1,
    gameName: 'match_match',
    pictureName: 'default',
    description: 'match_match_description',
    path: ERoutes.MATCH_MATCH,
    isOutside: false,
    labels: ['Single player'],
    mobileSuitable: true
  },
  {
    id: 4,
    gameName: 'tic_tac',
    pictureName: 'ticTacToe',
    description: 'tic_tac_description',
    path: ERoutes.TIC_TAC,
    isOutside: false,
    labels: ['2 players'],
    mobileSuitable: true
  },
  {
    id: 15,
    gameName: 'life_game',
    pictureName: 'lifeGame',
    description: 'life_game_description',
    path: ERoutes.LIFE,
    isOutside: false,
    labels: ['Single player'],
    mobileSuitable: true
  }
];

export const gamePics: IStringObject = {
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
  solitaire,
  lifeGame
};

export enum EGamesViews {
  PLATE = 'plate',
  ROWS = 'rows'
}
