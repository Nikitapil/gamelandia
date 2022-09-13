import React from 'react';
import { useTranslation } from 'react-i18next';
import invadersStyles from '../../styles/invaders.module.scss';

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
      <button
        onClick={closeModal}
        className={invadersStyles.gameOver__btn}
        type="button"
      >
        Okay
      </button>
    </div>
  );
};
