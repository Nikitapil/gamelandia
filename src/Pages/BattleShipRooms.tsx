import React, { FC, useMemo } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { doc, collection, setDoc } from "firebase/firestore";
import { Firestore } from "firebase/firestore";
import { Auth } from "firebase/auth";
import { RoomsCommon } from "../components/common/RoomsCommon";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import { breadcrumbs } from "../constants/breadcrumbs";

interface BattleShipRoomsProps {
  firestore: Firestore;
  auth: Auth;
}

export const BattleShipRooms: FC<BattleShipRoomsProps> = ({
  firestore,
  auth,
}) => {
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.battleshipRooms]);
  const [rooms] = useCollectionData(collection(firestore, "battleship"));
  const createRoom = async () => {
    const newRoom = {
      player1: null,
      player2: null,
      isAvailable: true,
      id: `room_${(rooms?.length || 0) + 1}`,
      name: `Room ${(rooms?.length || 0) + 1}`,
    };
    setDoc(doc(firestore, "battleship", newRoom.id), newRoom);
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
      auth={auth}
      createRoom={createRoom}
      page="battleship"
    />
  );
};
