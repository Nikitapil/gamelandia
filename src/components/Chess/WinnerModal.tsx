import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalContainer } from '../UI/ModalContainer';
import { AppButton } from '../UI/AppButton';

interface WinnerModalProps {
  color: string;
  newGame: () => void;
}

export const WinnerModal: FC<WinnerModalProps> = ({ color, newGame }) => {
  const { t } = useTranslation();

  const winner = useMemo(() => {
    return t(color).toUpperCase();
  }, [color]);

  return (
    <ModalContainer title={winner + t('wins')} closeModal={newGame}>
      <AppButton
        color="dark"
        testId="newGame-btn"
        onClick={newGame}
        customClass="chess__new-game"
        fullWidth
      >
        {t('new_game')}
      </AppButton>
    </ModalContainer>
  );
};
