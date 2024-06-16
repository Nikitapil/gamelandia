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
import brick from './assets/game-pictures/brick.png';
import asteroid from './assets/game-pictures/asteroid-warrior.png';

enum EGamesIds {
  NUMBERS = 0,
  SNAKE = 1,
  BATTLESHIP = 2,
  CHESS = 3,
  QUIZZER = 4,
  TETRIS = 5,
  ASTEROID_WARRIOR = 6,
  SOLITAIRE = 7,
  CLONE_INVADERS = 8,
  BRICK_GAME = 9,
  FLAPPY_BIRD = 10,
  AIM_GAME = 11,
  MATCH_MATCH = 12,
  TIC_TAC_TOE = 13,
  LIFE_GAME = 14
}

export const gamesCards: IGameCard[] = [
  {
    id: EGamesIds.NUMBERS,
    gameName: '2048',
    pictureName: 'numbers',
    description: 'numbers_description',
    path: ERoutes.NUMBERS,
    isOutside: false,
    labels: ['Single Player'],
    mobileSuitable: true
  },
  {
    id: EGamesIds.SNAKE,
    gameName: 'snake',
    pictureName: 'snake',
    description: 'snake_description',
    path: ERoutes.SNAKE,
    isOutside: false,
    labels: ['Single player'],
    mobileSuitable: true
  },
  {
    id: EGamesIds.BATTLESHIP,
    gameName: 'battleship',
    pictureName: 'battleship',
    description: 'battleship_description',
    path: ERoutes.BATTLESHIP,
    isOutside: false,
    labels: ['Online', '2players'],
    mobileSuitable: true
  },
  {
    id: EGamesIds.CHESS,
    gameName: 'chess',
    pictureName: 'chess',
    description: 'chess_description',
    path: ERoutes.CHESS,
    isOutside: false,
    labels: ['2 players', 'online', 'offline'],
    mobileSuitable: true
  },
  {
    id: EGamesIds.QUIZZER,
    gameName: 'quizzer',
    pictureName: 'quizzer',
    description: 'quizzer_description',
    path: 'https://nikitapil.github.io/quizzer-app/',
    isOutside: true,
    labels: [],
    mobileSuitable: true
  },
  {
    id: EGamesIds.TETRIS,
    gameName: 'tetris',
    pictureName: 'tetris',
    description: 'tetris_description',
    path: ERoutes.TETRIS,
    isOutside: false,
    labels: ['offline', 'Single player'],
    mobileSuitable: true
  },
  {
    id: EGamesIds.ASTEROID_WARRIOR,
    gameName: 'asteroid_warrior',
    pictureName: 'asteroid',
    description: 'asteroid_description',
    path: ERoutes.ASTEROID,
    isOutside: false,
    labels: ['offline', 'Single player', 'Not suitable for mobile'],
    mobileSuitable: false
  },
  {
    id: EGamesIds.SOLITAIRE,
    gameName: 'solitaire',
    pictureName: 'solitaire',
    description: 'solitaire_description',
    path: ERoutes.SOLITAIRE,
    isOutside: false,
    labels: ['offline', 'Single player'],
    mobileSuitable: true
  },
  {
    id: EGamesIds.CLONE_INVADERS,
    gameName: 'clone_invaders',
    pictureName: 'cloneInvaders',
    description: 'invaders_description',
    path: ERoutes.INVADERS,
    isOutside: false,
    labels: ['Single Player', 'Not suitable for mobile'],
    mobileSuitable: false
  },
  {
    id: EGamesIds.BRICK_GAME,
    gameName: 'brick_game',
    pictureName: 'brick',
    description: 'brick_game_description',
    path: ERoutes.BRICK,
    isOutside: false,
    labels: ['Single player', 'Not suitable for mobile'],
    mobileSuitable: false
  },
  {
    id: EGamesIds.FLAPPY_BIRD,
    gameName: 'flappy_bird',
    pictureName: 'flappy',
    description: 'flappy_description',
    path: ERoutes.FLAPPY,
    isOutside: false,
    labels: ['Single player', 'Not suitable for mobile'],
    mobileSuitable: false
  },
  {
    id: EGamesIds.AIM_GAME,
    gameName: 'aim_game',
    pictureName: 'aim',
    description: 'aim_game_description',
    path: ERoutes.AIM_GAME,
    isOutside: false,
    labels: ['Single player'],
    mobileSuitable: true
  },
  {
    id: EGamesIds.MATCH_MATCH,
    gameName: 'match_match',
    pictureName: 'default',
    description: 'match_match_description',
    path: ERoutes.MATCH_MATCH,
    isOutside: false,
    labels: ['Single player'],
    mobileSuitable: true
  },
  {
    id: EGamesIds.TIC_TAC_TOE,
    gameName: 'tic_tac',
    pictureName: 'ticTacToe',
    description: 'tic_tac_description',
    path: ERoutes.TIC_TAC,
    isOutside: false,
    labels: ['2 players'],
    mobileSuitable: true
  },
  {
    id: EGamesIds.LIFE_GAME,
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
  lifeGame,
  brick,
  asteroid
};

export enum EGamesViews {
  PLATE = 'plate',
  ROWS = 'rows'
}
