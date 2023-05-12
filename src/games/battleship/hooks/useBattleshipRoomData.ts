import { useDocumentData } from 'react-firebase-hooks/firestore';
import { doc, DocumentReference } from 'firebase/firestore';
import { useContext, useMemo } from 'react';
import { TBattleshipRoomData } from '../helpers/types';
import { FirebaseContext } from '../../../context/firebase-context/FirebaseContext';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { authSelector } from '../../../store/selectors';

export const useBattleshipRoomData = (id: string) => {
  const firestore = useContext(FirebaseContext);
  const { user } = useAppSelector(authSelector);
  const [roomData, loading] = useDocumentData<TBattleshipRoomData>(
    doc(firestore, 'battleship', id) as DocumentReference<TBattleshipRoomData>
  );

  const isFull = useMemo(() => {
    return (
      roomData?.player1 &&
      roomData.player2 &&
      roomData?.player1.uid !== user?.id &&
      roomData?.player2.uid !== user?.id
    );
  }, [roomData?.player1, roomData?.player2, user?.id]);

  return { roomData, loading, isFull };
};
