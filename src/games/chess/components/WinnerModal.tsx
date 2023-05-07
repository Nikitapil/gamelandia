import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalContainer } from '../../../components/UI/ModalContainer';
import { AppButton } from '../../../components/UI/AppButton/AppButton';

interface WinnerModalProps {
  color: string;
  newGame: () => void;
  isOpened: boolean;
}

export const WinnerModal: FC<WinnerModalProps> = ({
  color,
  newGame,
  isOpened
}) => {
  const { t } = useTranslation();

  const winner = useMemo(() => {
    return t(color).toUpperCase();
  }, [color]);

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
        customClass="chess__new-game"
        fullWidth
      >
        {t('new_game')}
      </AppButton>
    </ModalContainer>
  );
};
