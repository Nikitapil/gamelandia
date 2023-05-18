import { Firestore } from 'firebase/firestore';
import { RoomService } from '../services/rooms/RoomService';
import {
  TAttackCellParams,
  TBattleshipRoomData,
  TPlayerKey,
  TSetIsReadyParams
} from './helpers/types';
import {
  mapCellsToFirebase,
  mapFromFireBaseToBattleShip,
  mapShipsToFirebase
} from './helpers/battleShipMappers';
import { IUser } from '../../auth/types';

export class BattleshipService extends RoomService<TBattleshipRoomData> {
  private static instance: BattleshipService;

  constructor(firestore: Firestore) {
    super({ firestore, gameName: 'battleship' });
    if (!BattleshipService.instance) {
      BattleshipService.instance = this;
    }
  }

  static getInstance(firestore: Firestore) {
    if (BattleshipService.instance) {
      return BattleshipService.instance;
    }
    return new BattleshipService(firestore);
  }

  async attackCell({
    roomData,
    playerToAttackCells,
    playerToAttack,
    playerToAttackShips,
    isWinner,
    isSuccessfullAtack
  }: TAttackCellParams) {
    if (!playerToAttack || !roomData.currentPlayer) {
      return;
    }
    const newData = {
      ...roomData,
      [playerToAttack]: {
        ...roomData[playerToAttack],
        cells: mapCellsToFirebase(playerToAttackCells),
        ships: mapShipsToFirebase(playerToAttackShips)
      },
      winner: isWinner ? roomData[roomData.currentPlayer]?.name : ''
    };

    if (!isSuccessfullAtack) {
      newData.currentPlayer = playerToAttack;
    }

    await this.setRoomData(roomData.id, newData);
  }

  async setIsReady({ roomData, myPlayer, myCells, myShips }: TSetIsReadyParams) {
    if (!myPlayer) {
      return;
    }

    const newData = {
      ...roomData,
      [myPlayer]: {
        ...roomData[myPlayer],
        isReady: true,
        cells: mapCellsToFirebase(myCells),
        ships: mapShipsToFirebase(myShips)
      }
    };

    await this.setRoomData(roomData.id, newData);
  }

  async setPlayers(user: IUser, roomData: TBattleshipRoomData) {
    if (roomData?.player1 && roomData?.player2) {
      return;
    }

    const player = {
      uid: user.id,
      name: user.username,
      cells: []
    };

    let newData: TBattleshipRoomData = roomData;

    if (!roomData.player1) {
      newData = { ...roomData, player1: player };
    } else if (!roomData.player2 && roomData.player1?.uid !== user.id) {
      newData = { ...roomData, player2: player };
    }

    await this.setRoomData(roomData.id, newData);
  }

  startGame(roomData: TBattleshipRoomData) {
    if (!roomData.player1?.isReady || !roomData.player2?.isReady) {
      return false;
    }
    if (roomData.currentPlayer) {
      return true;
    }
    const newData: TBattleshipRoomData = {
      ...roomData,
      currentPlayer: 'player1'
    };
    this.setRoomData(roomData.id, newData);
    return true;
  }

  getBoardFromFireBase(roomData: TBattleshipRoomData, player: TPlayerKey, isEnemyBoard: boolean) {
    if (!player || !roomData[player] || !roomData[player]?.cells.length) {
      return null;
    }
    return mapFromFireBaseToBattleShip(
      roomData[player]?.cells || [],
      roomData[player]?.ships || [],
      isEnemyBoard
    );
  }
}
