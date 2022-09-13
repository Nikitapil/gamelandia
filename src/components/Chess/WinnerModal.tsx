import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalContainer } from '../UI/ModalContainer';

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
      <button
        data-testid="newGame-btn"
        className="chess__new-game"
        onClick={newGame}
      >
        {t('new_game')}
      </button>
    </ModalContainer>
  );
};
