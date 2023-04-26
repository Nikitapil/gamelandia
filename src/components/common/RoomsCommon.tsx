import { Auth } from 'firebase/auth';
import { DocumentData } from 'firebase/firestore';
import React, { memo } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { HorizotalLoader } from '../UI/Loaders/HorizotalLoader';
import commonStyles from '../../styles/common.module.scss';
import { AppButton } from '../UI/AppButton';
import { ERoutes } from '../../constants/routes';

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
    const { t } = useTranslation();
    if (loading) {
      return (
        <div className={commonStyles.rooms__loader}>
          <HorizotalLoader />
        </div>
      );
    }

    if (!loading && !user) {
      navigate(`${ERoutes.LOGIN}?page=${page}`);
      toast.info(t('need_login_first') as string);
    }
    return (
      <div className={`container ${commonStyles.rooms__container}`}>
        <h2 className="page-title">{t('rooms_title')}</h2>
        <table className={commonStyles.rooms__table}>
          <thead>
            <tr>
              <td>
                <AppButton color="success" onClick={createRoom} type="button">
                  {t('create_room')}
                </AppButton>
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
