import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IUser } from '../../auth/types';
import styles from '../assets/styles/profile.module.scss';
import { SimpleUserSetting } from '../components/user-settings/SimpleUserSetting';
import { PasswordUserSetting } from '../components/user-settings/PasswordUserSetting';
import { useProfileActions } from '../hooks/useProfileActions';
import { IEditUserRequest } from '../types';

export const Profile = () => {
  const { t } = useTranslation();

  const { username, email } = useOutletContext<IUser>();

  const { editUser } = useProfileActions();

  const onEditUserSetting = (key: keyof IEditUserRequest, value: string) => {
    const req = { [key]: value };
    editUser(req);
  };

  return (
    <div className={styles.settings}>
      <SimpleUserSetting
        title={t('username')}
        initialValue={username}
        rules={['required']}
        submit={(val) => onEditUserSetting('username', val)}
      />
      <SimpleUserSetting
        title="Email"
        initialValue={email}
        rules={['required', 'email']}
        submit={(val) => onEditUserSetting('email', val)}
      />
      <PasswordUserSetting submit={(val) => onEditUserSetting('password', val)} />
    </div>
  );
};
