import React, { useCallback, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IUser } from '../../auth/types';
import styles from '../assets/styles/profile.module.scss';
import { SimpleUserSetting } from '../components/user-settings/SimpleUserSetting';
import { PasswordUserSetting } from '../components/user-settings/PasswordUserSetting';
import { useProfileActions } from '../hooks/useProfileActions';
import { IEditUserRequest } from '../types';
import { AppButton } from '../../components/UI/AppButton/AppButton';
import { ConfirmModal } from '../../components/ConfirmModal/ConfirmModal';

export const Profile = () => {
  const { t } = useTranslation();

  const { username, email, id } = useOutletContext<IUser>();

  const { editUser, deleteProfile } = useProfileActions();

  const [isDeleteProfileModalOpened, setIsDeleteProfileModalOpened] = useState(false);

  const onEditUserSetting = (key: keyof IEditUserRequest, value: string) => {
    const req = { [key]: value };
    editUser(req);
  };

  const onOpenDeleteProfileModal = useCallback(() => {
    setIsDeleteProfileModalOpened(true);
  }, []);

  const onCloseDeleteProfileModal = useCallback(() => {
    setIsDeleteProfileModalOpened(false);
  }, []);

  const onDeleteProfile = useCallback(() => {
    deleteProfile(id);
  }, [deleteProfile, id]);

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
      <AppButton
        color="danger"
        text={t('delete_profile')}
        onClick={onOpenDeleteProfileModal}
      />
      <ConfirmModal
        closeModal={onCloseDeleteProfileModal}
        isOpened={isDeleteProfileModalOpened}
        confirm={onDeleteProfile}
        confirmBtnText={t('delete')}
        title={`${t('delete_profile')}?`}
      />
    </div>
  );
};
