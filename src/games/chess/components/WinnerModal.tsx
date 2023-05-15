import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalContainer } from '../../../components/UI/ModalContainer/ModalContainer';
import { AppButton } from '../../../components/UI/AppButton/AppButton';

interface IWinnerModalProps {
  color: string;
  newGame: () => void;
  isOpened: boolean;
}

export const WinnerModal: FC<IWinnerModalProps> = ({ color, newGame, isOpened }) => {
  const { t } = useTranslation();

  const winner = useMemo(() => {
    return t(color).toUpperCase();
  }, [color, t]);

  return (
    <ModalContainer
      title={winner + t('wins')}
      closeModal={newGame}
      isOpened={isOpened}
    >
      <AppButton
        color="dark"
        testId="newGame-btn"
        onClick={newGame}
        customClass="mt-20"
        fullWidth
      >
        {t('new_game')}
      </AppButton>
    </ModalContainer>
  );
};
