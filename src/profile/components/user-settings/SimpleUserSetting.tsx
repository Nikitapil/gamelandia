import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../assets/styles/profile.module.scss';
import { AppButton } from '../../../components/UI/AppButton/AppButton';
import { ChangeUserSettingModal } from './ChangeUserSettingModal';
import { TValidationRules } from '../../../utils/validators';

interface ISimpleUserSettingProps {
  title: string;
  initialValue: string;
  rules: TValidationRules[];
  submit: (value: string) => void;
}

export const SimpleUserSetting = ({
  title,
  initialValue,
  rules,
  submit
}: ISimpleUserSettingProps) => {
  const { t } = useTranslation();

  const [isModalOpened, setIsModalOpened] = useState(false);

  const openModal = () => setIsModalOpened(true);
  const closeModal = () => setIsModalOpened(false);

  return (
    <div className={styles['profile-setting']}>
      <p>
        {title}: <span>{initialValue}</span>
      </p>
      <AppButton
        color="dark"
        text={t('change')}
        onClick={openModal}
      />
      <ChangeUserSettingModal
        isOpened={isModalOpened}
        initialValue={initialValue}
        title={title}
        rules={rules}
        closeModal={closeModal}
        submit={submit}
      />
    </div>
  );
};
