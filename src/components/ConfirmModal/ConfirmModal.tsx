import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalContainer } from '../UI/ModalContainer/ModalContainer';
import { AppButton } from '../UI/AppButton/AppButton';
import styles from './confirm-modal.module.scss';

interface IConfirmModalProps {
  text?: string;
  closeModal: () => void;
  isOpened: boolean;
  confirm: () => void;
  title?: string;
  preventClosing?: boolean;
  bg?: 'dark' | 'light';
  confirmBtnText?: string;
}

export const ConfirmModal = ({
  closeModal,
  isOpened,
  text,
  confirm,
  title = '',
  preventClosing,
  bg = 'dark',
  confirmBtnText
}: IConfirmModalProps) => {
  const { t } = useTranslation();

  const confirmBtnTextComputed = useMemo(() => {
    return confirmBtnText || t('confirm');
  }, [confirmBtnText, t]);

  return (
    <ModalContainer
      closeModal={closeModal}
      isOpened={isOpened}
      title={title}
      preventClosing={preventClosing}
      bg={bg}
    >
      <div className={styles['confirm-container']}>
        {text && <p>{text}</p>}
        <div className={styles.buttons}>
          <AppButton
            customClass="w-100"
            color="danger"
            text={t('cancel')}
            size="lg"
            onClick={closeModal}
          />
          <AppButton
            color="primary"
            customClass="w-100"
            size="lg"
            text={confirmBtnTextComputed}
            onClick={confirm}
          />
        </div>
      </div>
    </ModalContainer>
  );
};
