import { Auth } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import React, { FC, memo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAppNotification } from "../../redux/appStore/appActions";
import { HorizotalLoader } from "../UI/Loaders/HorizotalLoader";
import commonStyles from '../../styles/common.module.scss'


interface RoomsCommonProps {
  auth: Auth;
  createRoom: (() => Promise<void>) | (() => void);
  rooms: DocumentData[] | undefined;
  page: string;
}

export const RoomsCommon: FC<RoomsCommonProps> = memo(({ auth, page, rooms, createRoom }) => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (loading) {
    return (
      <div className={commonStyles.rooms__loader}>
        <HorizotalLoader />
      </div>
    );
  }

  if (!loading && !user) {
    navigate(`/login?page=${page}`);
    dispatch(
      setAppNotification({
        timeout: 3500,
        message: "Need login first",
        type: "error",
      })
    );
  }
  return (
    <div className={`container ${commonStyles.rooms__container}`}>
      <h2 className="page-title">Choose room to play or create new</h2>
      <table className={commonStyles.rooms__table}>
        <thead>
          <tr>
            <td>
              <button className={commonStyles['create-room__btn']} onClick={createRoom}>
                Create room
              </button>
            </td>
          </tr>
        </thead>
        <tbody>
          {rooms?.map((room) => (
            <tr key={room.id}>
              <td>
                <Link to={`/${page}/${room.id}`} className={commonStyles['room-link']}>
                  {room.name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
