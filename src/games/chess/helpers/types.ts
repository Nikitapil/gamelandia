import { EFigureNames } from './constants';
import { EChessColors } from '../models/EChessColors';
import { Player } from '../models/Player';
import { Board } from '../models/Board';

export interface IFireBaseChessFigure {
  color: EChessColors;
  name: EFigureNames;
}

export interface IFirebaseChessCell {
  x: number;
  y: number;
  color: EChessColors;
  figure: IFireBaseChessFigure | null;
}

export interface IFirebaseChessBoard {
  cells: IFirebaseChessCell[];
  lostBlackFigures: IFireBaseChessFigure[];
  lostWhiteFigures: IFireBaseChessFigure[];
  underAttackMessage: string;
}

export interface IChessTime {
  black: number;
  white: number;
}

export type TChessPlayer = {
  color: EChessColors;
  name: string;
  uid: number;
};

export type TChessRoomData = {
  player1: TChessPlayer | null;
  player2: TChessPlayer | null;
  currentPlayer: TChessPlayer | null;
  time: IChessTime;
  board: IFirebaseChessBoard | null;
  winner: TChessPlayer | null;
  isGameStarted: boolean;
  id: string;
  name: string;
};

export type TChessSwapPlayerRequest = {
  roomData: TChessRoomData;
  currentPlayer: Player | null;
  board: Board;
  time: IChessTime;
};
