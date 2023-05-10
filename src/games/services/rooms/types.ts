import { Firestore } from 'firebase/firestore';

export type TRoomServiceInitData = {
  firestore: Firestore;
  gameName: string;
}