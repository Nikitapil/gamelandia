import { Auth } from 'firebase/auth';
import { DocumentData } from 'firebase/firestore';
import React, { memo } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setAppNotification } from '../../redux/appStore/appActions';
import { HorizotalLoader } from '../UI/Loaders/HorizotalLoader';
import commonStyles from '../../styles/common.module.scss';

interface RoomsCommonProps {
  auth: Auth;
  createRoom: (() => Promise<void>) | (() => void);
  rooms: DocumentData[] | undefined;
  page: string;
}

export const RoomsCommon = memo(
  ({ auth, page, rooms, createRoom }: RoomsCommonProps) => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();
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
          message: t('need_login_first'),
          type: 'error'
        })
      );
    }
    return (
      <div className={`container ${commonStyles.rooms__container}`}>
        <h2 className="page-title">{t('rooms_title')}</h2>
        <table className={commonStyles.rooms__table}>
          <thead>
            <tr>
              <td>
                <button
                  className={commonStyles['create-room__btn']}
                  onClick={createRoom}
                  type="button"
                >
                  {t('create_room')}
                </button>
              </td>
            </tr>
          </thead>
          <tbody>
            {rooms?.map((room) => (
              <tr key={room.id}>
                <td>
                  <Link
                    to={`/${page}/${room.id}`}
                    className={commonStyles['room-link']}
                  >
                    {room.name}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);
