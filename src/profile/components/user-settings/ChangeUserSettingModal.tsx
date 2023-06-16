import React, { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalContainer } from '../../../components/UI/ModalContainer/ModalContainer';
import { AppInput } from '../../../components/UI/AppInput/AppInput';
import { TValidationRules } from '../../../utils/validators';
import { AppButton } from '../../../components/UI/AppButton/AppButton';

interface IChangeUserSettingModalProps {
  closeModal: () => void;
  isOpened: boolean;
  title: string;
  initialValue: string;
  rules: TValidationRules[];
}

export const ChangeUserSettingModal = ({
  closeModal,
  isOpened,
  title,
  initialValue,
  rules
}: IChangeUserSettingModalProps) => {
  const { t } = useTranslation();

  const [value, setValue] = useState(initialValue);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <ModalContainer
      closeModal={closeModal}
      isOpened={isOpened}
      title={`${t('change')} ${title}`}
      bg="dark"
    >
      <AppInput
        type="text"
        name={title}
        value={value}
        rules={rules}
        onChange={onChangeHandler}
      />
      <div className="d-flex gap-10">
        <AppButton
          text={t('cancel')}
          color="danger"
          size="lg"
          onClick={closeModal}
        />
        <AppButton
          text={t('change')}
          color="success"
          size="lg"
          disabled={!value}
        />
      </div>
    </ModalContainer>
  );
};
