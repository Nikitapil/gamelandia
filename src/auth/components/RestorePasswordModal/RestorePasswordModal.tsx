import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalContainer } from '../../../components/UI/ModalContainer/ModalContainer';
import { ERestorePasswordSteps } from '../../constants';
import { RestoreEmailForm } from './RestoreEmailForm';
import { RestorePasswordForm } from './RestorePasswordForm';
import { useAuthActions } from '../../hooks/useAuthActions';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { authSelector } from '../../../store/selectors';
import { FullLoader } from '../../../components/UI/Loaders/FullLoader';

interface IRestorePasswordModalProps {
  isOpened: boolean;
  closeModal: () => void;
  initialEmail: string;
}

export const RestorePasswordModal = ({
  closeModal,
  isOpened,
  initialEmail
}: IRestorePasswordModalProps) => {
  const { t } = useTranslation();
  const { getRestorePasswordKey, restorePassword } = useAuthActions();
  const { restorePasswordStep, isRestorePasswordLoading } = useAppSelector(authSelector);

  const title = useMemo(() => {
    return restorePasswordStep === ERestorePasswordSteps.GET_EMAIL
      ? t('write_your_email')
      : t('set_password');
  }, [restorePasswordStep, t]);

  const onConfirmEmail = async (email: string) => {
    await getRestorePasswordKey(email);
  };

  return (
    <ModalContainer
      closeModal={closeModal}
      isOpened={isOpened}
      title={title}
      bg="dark"
    >
      {isRestorePasswordLoading && <FullLoader />}
      {restorePasswordStep === ERestorePasswordSteps.GET_EMAIL && (
        <RestoreEmailForm
          initialValue={initialEmail}
          next={onConfirmEmail}
        />
      )}
      {restorePasswordStep === ERestorePasswordSteps.UPDATE_PASSWORD && (
        <RestorePasswordForm restorePassword={restorePassword} />
      )}
    </ModalContainer>
  );
};
