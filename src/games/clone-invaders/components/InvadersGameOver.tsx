import React from 'react';
import { useTranslation } from 'react-i18next';
import invadersStyles from '../assets/styles/invaders.module.scss';
import { AppButton } from '../../../components/UI/AppButton/AppButton';
import { ModalContainer } from '../../../components/UI/ModalContainer/ModalContainer';

interface InvadersGameOverProps {
  score: number;
  closeModal: () => void;
  isOpened: boolean;
}

export const InvadersGameOver = ({ score, closeModal, isOpened }: InvadersGameOverProps) => {
  const { t } = useTranslation();

  return (
    <ModalContainer
      closeModal={closeModal}
      isOpened={isOpened}
    >
      <p className={invadersStyles.gameOver__text}>
        {t('your_score')}: {score}
      </p>
      <AppButton
        onClick={closeModal}
        text="Okay"
        color="dark"
        customClass={invadersStyles.gameOver__btn}
        type="button"
      />
    </ModalContainer>
  );
};
