import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../assets/styles/profile.module.scss';
import { AppButton } from '../../../components/UI/AppButton/AppButton';
import { ChangePasswordModal } from './ChangePasswordModal';

export const PasswordUserSetting = () => {
  const { t } = useTranslation();

  const [isModalOpened, setIsModalOpened] = useState(false);

  const openModal = () => setIsModalOpened(true);
  const closeModal = () => setIsModalOpened(false);

  return (
    <div className={styles['profile-setting']}>
      <p>
        {t('password')} <span>********</span>
      </p>
      <AppButton
        color="dark"
        text={t('change')}
        onClick={openModal}
      />
      <ChangePasswordModal
        isOpened={isModalOpened}
        closeModal={closeModal}
      />
    </div>
  );
};
