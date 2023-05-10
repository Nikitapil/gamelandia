import { doc, Firestore, setDoc } from 'firebase/firestore';
import { TRoomServiceInitData } from './types';

export class RoomService<T> {
  firestore: Firestore;

  gameName: string;

  constructor({ firestore, gameName }: TRoomServiceInitData) {
    this.firestore = firestore;
    this.gameName = gameName;
  }

  getRoomDoc(id: string) {
    return doc(this.firestore, this.gameName, id);
  }

  async setRoomData(id: string, roomData: T) {
    await setDoc(this.getRoomDoc(id), roomData);
  }
}
