import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './full-room-message.module.scss';

interface IFullRoomMessageProps {
  page: string;
}

export const FullRoomMessage: FC<IFullRoomMessageProps> = ({ page }) => {
  const { t } = useTranslation();
  return (
    <h2 className={styles['full-message']}>
      {t('full_room_message')}
      <Link
        className={styles['message-link']}
        to={page}
      >
        {t('go_to_rooms')}
      </Link>
    </h2>
  );
};
