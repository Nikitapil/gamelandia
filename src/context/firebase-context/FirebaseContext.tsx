import React, { createContext, ReactNode } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './fbconfig';

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export const FirebaseContext = createContext(firestore);

interface IFirebaseProviderProps {
  children: ReactNode;
}

export const FirebaseProvider = ({ children }: IFirebaseProviderProps) => {
  return <FirebaseContext.Provider value={firestore}>{children}</FirebaseContext.Provider>;
};
