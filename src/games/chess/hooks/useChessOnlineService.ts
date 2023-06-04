import { useContext } from 'react';
import { FirebaseContext } from '../../../context/firebase-context/FirebaseContext';
import { ChessOnlineService } from '../ChessOnlineService';

export const useChessOnlineService = () => {
  const firestore = useContext(FirebaseContext);
  const service = ChessOnlineService.getInstance(firestore);
  return service;
};
