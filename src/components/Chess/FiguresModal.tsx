import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import {
  faChessBishop,
  faChessKnight,
  faChessQueen,
  faChessRook
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { FigureNames } from '../../constants/chess';
import { Cell } from '../../models/chess/Cell';
import { Bishop } from '../../models/chess/figures/Bishop';
import { Knight } from '../../models/chess/figures/Knight';
import { Queen } from '../../models/chess/figures/Queen';
import { Rook } from '../../models/chess/figures/Rook';
import { Player } from '../../models/chess/Player';
import { ModalContainer } from '../UI/ModalContainer';
import { Board } from '../../models/chess/Board';

interface FiguresModalProps {
  closeModal: () => void;
  swapPlayer: () => void;
  currentPlayer: Player | null;
  cell: Cell | null;
  board: Board;
  isOpened: boolean;
}

export const FiguresModal: FC<FiguresModalProps> = ({
  currentPlayer,
  cell,
  swapPlayer,
  closeModal,
  board,
  isOpened
}) => {
  const { t } = useTranslation();

  if (!Cell) {
    return null;
  }
  const chooseFigure = (figure: string) => {
    // eslint-disable-next-line default-case
    switch (figure) {
      case FigureNames.BISHOP:
        new Bishop(currentPlayer?.color!, cell!);
        break;
      case FigureNames.KNIGHT:
        new Knight(currentPlayer?.color!, cell!);
        break;
      case FigureNames.QUEEN:
        new Queen(currentPlayer?.color!, cell!);
        break;
      case FigureNames.ROOK:
        new Rook(currentPlayer?.color!, cell!);
        break;
    }
    board.checkIfKingIsUnderAttack();
    swapPlayer();
    closeModal();
  };

  return (
    <ModalContainer
      title={t('choose_new_figure')}
      isOpened={isOpened}
      closeModal={closeModal}
      preventClosing
    >
      <div className="figures-container">
        <button
          className="figure-button"
          onClick={() => chooseFigure(FigureNames.BISHOP)}
          data-testid="bishop-btn"
          type="button"
        >
          <FontAwesomeIcon icon={faChessBishop} /> {t('bishop')}
        </button>
        <button
          className="figure-button"
          onClick={() => chooseFigure(FigureNames.KNIGHT)}
          data-testid="knight-btn"
          type="button"
        >
          <FontAwesomeIcon icon={faChessKnight} /> {t('knight')}
        </button>
        <button
          className="figure-button"
          onClick={() => chooseFigure(FigureNames.QUEEN)}
          data-testid="queen-btn"
          type="button"
        >
          <FontAwesomeIcon icon={faChessQueen} /> {t('queen')}
        </button>
        <button
          className="figure-button"
          onClick={() => chooseFigure(FigureNames.ROOK)}
          data-testid="rook-btn"
          type="button"
        >
          <FontAwesomeIcon icon={faChessRook} /> {t('rook')}
        </button>
      </div>
    </ModalContainer>
  );
};
