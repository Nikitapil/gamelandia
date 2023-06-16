import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IUser } from '../../auth/types';
import styles from '../assets/styles/profile.module.scss';
import { SimpleUserSetting } from '../components/user-settings/SimpleUserSetting';
import { PasswordUserSetting } from '../components/user-settings/PasswordUserSetting';

export const Profile = () => {
  const { t } = useTranslation();

  const { username, email } = useOutletContext<IUser>();

  return (
    <div className={styles.settings}>
      <SimpleUserSetting
        title={t('username')}
        initialValue={username}
        rules={['required']}
      />
      <SimpleUserSetting
        title="Email"
        initialValue={email}
        rules={['required', 'email']}
      />
      <PasswordUserSetting />
    </div>
  );
};
