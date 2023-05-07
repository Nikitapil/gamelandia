import React from 'react';
import { useTranslation } from 'react-i18next';
import invadersStyles from '../assets/styles/invaders.module.scss';
import { AppButton } from '../../../components/UI/AppButton/AppButton';

interface InvadersGameOverProps {
  score: number;
  closeModal: () => void;
}

export const InvadersGameOver = ({
  score,
  closeModal
}: InvadersGameOverProps) => {
  const { t } = useTranslation();

  return (
    <div>
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
    </div>
  );
};
