import { useContext, useMemo } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { doc, DocumentReference } from 'firebase/firestore';
import { FirebaseContext } from '../../../context/firebase-context/FirebaseContext';
import { TChessRoomData } from '../helpers/types';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { authSelector } from '../../../store/selectors';

export const useChessOnlineRoomData = (id: string) => {
  const firestore = useContext(FirebaseContext);
  const { user } = useAppSelector(authSelector);
  const [roomData, loading] = useDocumentData<TChessRoomData>(
    doc(firestore, 'chess', id) as DocumentReference<TChessRoomData>
  );

  const isFull = useMemo(() => {
    return (
      roomData?.player1 &&
      roomData.player2 &&
      roomData.player1.uid !== user?.id &&
      roomData.player2.uid !== user?.id
    );
  }, [roomData?.player1, roomData?.player2, user?.id]);

  const isReadyToStart = useMemo(() => {
    return roomData?.player1 && roomData.player2 && !roomData.isGameStarted;
  }, [roomData?.isGameStarted, roomData?.player1, roomData?.player2]);

  return { roomData, loading, isFull, isReadyToStart };
};
