import React, { FC, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "../styles/battleship.scss";
import { doc, collection, setDoc } from "firebase/firestore";
import { Firestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "firebase/auth";
import { HorizotalLoader } from "../components/UI/Loaders/HorizotalLoader";
import { useDispatch } from "react-redux";
import { setAppNotification } from "../redux/appStore/appActions";

interface BattleShipRoomsProps {
  firestore: Firestore;
  auth: Auth;
}

export const BattleShipRooms: FC<BattleShipRoomsProps> = ({
  firestore,
  auth,
}) => {
  const [rooms] = useCollectionData(collection(firestore, "battleship"));
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  if (loading) {
    return (
      <div className="battleship__loader">
        <HorizotalLoader />
      </div>
    );
  }

  if (!loading && !user) {
    navigate("/login?page=battleship");
    dispatch(
      setAppNotification({
        timeout: 3500,
        message: "Need login first",
        type: "error",
      })
    );
  }

  return (
    <div className="container battlship-rooms__container">
      <h2 className="page-title">Choose room to play or create new</h2>
      <table className="battlship-rooms__table">
        <thead>
          <tr>
            <td>
              <button className="create-room__btn" onClick={createRoom}>
                Create room
              </button>
            </td>
          </tr>
        </thead>
        <tbody>
          {filteredRooms?.map((room) => (
            <tr key={room.id}>
              <td>
                <Link to={`/battleship/${room.id}`} className="room-link">
                  {room.name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
