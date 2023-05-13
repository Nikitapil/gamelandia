import { deleteDoc, doc, Firestore, setDoc } from 'firebase/firestore';
import { TRoomServiceInitData } from './types';

export class RoomService<T> {
  private readonly firestore: Firestore;

  private readonly gameName: string;

  constructor({ firestore, gameName }: TRoomServiceInitData) {
    this.firestore = firestore;
    this.gameName = gameName;
  }

  private getRoomDoc(id: string) {
    return doc(this.firestore, this.gameName, id);
  }

  protected async setRoomData(id: string, roomData: T) {
    await setDoc(this.getRoomDoc(id), roomData);
  }

  async deleteRoom(id: string) {
    await deleteDoc(this.getRoomDoc(id));
  }
}
