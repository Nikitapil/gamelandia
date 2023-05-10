import { useContext } from 'react';
import { FirebaseContext } from '../../../context/firebase-context/FirebaseContext';
import { BattleshipService } from '../BattleshipService';

export const useBattleshipService = () => {
  const firestore = useContext(FirebaseContext);
  const service = BattleshipService.getInstance(firestore);
  return service;
};
