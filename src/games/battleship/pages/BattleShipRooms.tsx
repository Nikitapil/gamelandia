import React, { useContext, useMemo } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { doc, collection, setDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { RoomsCommon } from '../../components/RoomsCommon';
import { useBreadcrumbs } from '../../../app/hooks/useBreadcrumbs';
import { breadcrumbs } from '../../../constants/breadcrumbs';
import { useTitle } from '../../../hooks/useTitle';
import { FirebaseContext } from '../../../context/firebase-context/FirebaseContext';

export const BattleShipRooms = () => {
  const { t } = useTranslation();
  useTitle(t('battleship'));
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.battleshipRooms]);
  const firestore = useContext(FirebaseContext);
  const [rooms] = useCollectionData(collection(firestore, 'battleship'));
  const createRoom = async () => {
    const newRoom = {
      player1: null,
      player2: null,
      isAvailable: true,
      id: `room_${(rooms?.length || 0) + 1}`,
      name: `Room ${(rooms?.length || 0) + 1}`
    };
    await setDoc(doc(firestore, 'battleship', newRoom.id), newRoom);
  };

  const filteredRooms = useMemo(() => {
    return rooms
      ?.filter((room) => !room.palyer1 || !room.player2)
      .sort(
        (a, b) => parseInt(a.name.match(/\d+/)) - parseInt(b.name.match(/\d+/))
      );
  }, [rooms]);

  return (
    <RoomsCommon
      rooms={filteredRooms}
      createRoom={createRoom}
      page="battleship"
    />
  );
};
