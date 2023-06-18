import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './rooms-common.module.scss';
import { AppButton } from '../../../components/UI/AppButton/AppButton';
import { IBaseRoomData } from '../../hooks/rooms/useRoomsCollection';

interface RoomsCommonProps {
  createRoom: (() => Promise<void>) | (() => void);
  page: string;
  rooms?: IBaseRoomData[];
}

export const RoomsCommon = memo(({ page, rooms, createRoom }: RoomsCommonProps) => {
  const { t } = useTranslation();

  return (
    <div className={`container ${styles.rooms__container}`}>
      <h2 className="page-title">{t('rooms_title')}</h2>
      <table className={styles.rooms__table}>
        <thead>
          <tr>
            <th>
              <AppButton
                color="success"
                onClick={createRoom}
                type="button"
              >
                {t('create_room')}
              </AppButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {rooms?.map((room) => (
            <tr key={room.id}>
              <td>
                <Link
                  to={`/${page}/${room.id}`}
                  className={styles['room-link']}
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
});
