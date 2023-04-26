import React, { FC, useMemo } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { doc, collection, setDoc, Firestore } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { RoomsCommon } from '../components/common/RoomsCommon';
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import { breadcrumbs } from '../constants/breadcrumbs';
import { useTitle } from '../hooks/useTitle';

interface BattleShipRoomsProps {
  firestore: Firestore;
}

export const BattleShipRooms: FC<BattleShipRoomsProps> = ({ firestore }) => {
  const { t } = useTranslation();
  useTitle(t('battleship'));
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.battleshipRooms]);
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
