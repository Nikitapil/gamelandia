import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { RoomsCommon } from '../../components/RoomsCommon/RoomsCommon';
import { useBreadcrumbs } from '../../../app/hooks/useBreadcrumbs';
import { breadcrumbs } from '../../../constants/breadcrumbs';
import { useTitle } from '../../../hooks/useTitle';
import { TBattleshipRoomData } from '../helpers/types';
import { useRoomsCollection } from '../../hooks/rooms/useRoomsCollection';

export const BattleShipRooms = () => {
  const { t } = useTranslation();
  useTitle(t('battleship'));
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.battleshipRooms]);

  const { rooms, createRoom } = useRoomsCollection<TBattleshipRoomData>('battleship');

  const addRoom = async () => {
    const newRoom = {
      player1: null,
      player2: null,
      isAvailable: true,
      id: `room_${(rooms?.length || 0) + 1}`,
      name: `Room ${(rooms?.length || 0) + 1}`
    };
    await createRoom(newRoom);
  };

  const filteredRooms = useMemo(() => {
    return rooms?.filter((room) => !room.player1 || !room.player2);
  }, [rooms]);

  return (
    <RoomsCommon
      rooms={filteredRooms}
      createRoom={addRoom}
      page="battleship"
    />
  );
};
