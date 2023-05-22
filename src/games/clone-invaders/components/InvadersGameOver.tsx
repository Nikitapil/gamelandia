import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../assets/styles/invaders.module.scss';
import { AppButton } from '../../../components/UI/AppButton/AppButton';
import { ModalContainer } from '../../../components/UI/ModalContainer/ModalContainer';

interface IInvadersGameOverProps {
  score: number;
  closeModal: () => void;
  isOpened: boolean;
}

export const InvadersGameOver = ({ score, closeModal, isOpened }: IInvadersGameOverProps) => {
  const { t } = useTranslation();

  return (
    <ModalContainer
      closeModal={closeModal}
      isOpened={isOpened}
    >
      <p className={styles.gameOver__text}>
        {t('your_score')}: {score}
      </p>
      <AppButton
        onClick={closeModal}
        text="Okay"
        color="dark"
        customClass={styles.gameOver__btn}
        type="button"
      />
    </ModalContainer>
  );
};
