import { Firestore } from 'firebase/firestore';
import { RoomService } from '../services/rooms/RoomService';
import {
  TAttackCellParams,
  TBattleshipRoomData,
  TSetIsReadyParams
} from './helpers/types';
import {
  mapCellsToFirebase,
  mapShipsToFirebase
} from './helpers/battleShipMappers';

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

  async setIsReady({
    roomData,
    myPlayer,
    myCells,
    myShips
  }: TSetIsReadyParams) {
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
}
