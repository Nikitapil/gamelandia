import { useCallback, useContext } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, CollectionReference, doc, setDoc } from 'firebase/firestore';
import { FirebaseContext } from '../../../context/firebase-context/FirebaseContext';

interface IBaseRoomData {
  id: string;
}

export const useRoomsCollection = <T>(gameName: string) => {
  const firestore = useContext(FirebaseContext);
  const [rooms] = useCollectionData<T>(collection(firestore, gameName) as CollectionReference<T>);

  const createRoom = useCallback(
    async (roomData: IBaseRoomData) => {
      await setDoc(doc(firestore, gameName, roomData.id), roomData);
    },
    [firestore, gameName]
  );
  return { rooms, createRoom };
};
