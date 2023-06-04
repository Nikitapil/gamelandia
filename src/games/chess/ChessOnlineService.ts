import { Firestore } from 'firebase/firestore';
import { RoomService } from '../services/rooms/RoomService';
import { TChessRoomData, TChessSwapPlayerRequest } from './helpers/types';
import { IUser } from '../../auth/types';
import { EChessColors } from './models/EChessColors';
import { Board } from './models/Board';
import { chessBoardToFirebaseMapper, mapBoardFromFireBase } from './helpers/chessMapper';
import { Player } from './models/Player';

export class ChessOnlineService extends RoomService<TChessRoomData> {
  private static instance: ChessOnlineService;

  constructor(firestore: Firestore) {
    super({ firestore, gameName: 'chess' });
    if (!ChessOnlineService.instance) {
      ChessOnlineService.instance = this;
    }
  }

  static getInstance(firestore: Firestore) {
    if (ChessOnlineService.instance) {
      return ChessOnlineService.instance;
    }
    return new ChessOnlineService(firestore);
  }

  async setupPlayers(roomData: TChessRoomData, user: IUser) {
    const playerBase = {
      uid: user.id,
      name: user.username
    };
    let newData: TChessRoomData = roomData;
    if (!roomData.player1) {
      newData = { ...roomData, player1: { ...playerBase, color: EChessColors.WHITE } };
    } else if (!roomData.player2 && roomData.player1.uid !== user.id) {
      newData = { ...roomData, player2: { ...playerBase, color: EChessColors.BLACK } };
    }
    await this.setRoomData(roomData.id, newData);
  }

  async startGame(roomData: TChessRoomData, board: Board) {
    const newData: TChessRoomData = {
      ...roomData,
      isGameStarted: true,
      board: chessBoardToFirebaseMapper(board),
      currentPlayer: roomData.player1
    };
    await this.setRoomData(roomData.id, newData);
  }

  getDataFromFirebase(roomData: TChessRoomData) {
    if (!roomData.board || !roomData.currentPlayer) {
      return null;
    }
    const newBoard = mapBoardFromFireBase(roomData.board);
    const time = roomData.time;
    const actualCurrentPlayer = new Player(roomData.currentPlayer.color);

    return { newBoard, time, actualCurrentPlayer };
  }

  async setWinner(roomData: TChessRoomData, currentPlayer: Player) {
    const winnerPlayer =
      currentPlayer.color === EChessColors.WHITE ? roomData?.player2 : roomData?.player1;
    const newData: TChessRoomData = {
      ...roomData,
      winner: winnerPlayer
    };
    await this.setRoomData(roomData.id, newData);
  }

  async swapPlayer({ roomData, currentPlayer, board, time }: TChessSwapPlayerRequest) {
    const nextPlayer =
      currentPlayer?.color === EChessColors.WHITE ? roomData.player2 : roomData.player1;
    const newData: TChessRoomData = {
      ...roomData,
      time,
      board: chessBoardToFirebaseMapper(board),
      currentPlayer: nextPlayer
    };
    await this.setRoomData(roomData.id, newData);
  }
}
