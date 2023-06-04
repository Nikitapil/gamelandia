import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import {
  faChessBishop,
  faChessKnight,
  faChessQueen,
  faChessRook
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { EFigureNames } from '../helpers/constants';
import { Cell } from '../models/Cell';
import { Bishop } from '../models/figures/Bishop';
import { Knight } from '../models/figures/Knight';
import { Queen } from '../models/figures/Queen';
import { Rook } from '../models/figures/Rook';
import { Player } from '../models/Player';
import { ModalContainer } from '../../../components/UI/ModalContainer/ModalContainer';
import { Board } from '../models/Board';
import styles from '../assets/styles/chess.module.scss';

interface IFiguresModalProps {
  closeModal: () => void;
  swapPlayer: () => void;
  currentPlayer: Player | null;
  cell: Cell | null;
  board: Board;
  isOpened: boolean;
}

export const FiguresModal: FC<IFiguresModalProps> = ({
  currentPlayer,
  cell,
  swapPlayer,
  closeModal,
  board,
  isOpened
}) => {
  const { t } = useTranslation();

  if (!cell || !currentPlayer) {
    return null;
  }

  const chooseFigure = (figure: string) => {
    switch (figure) {
      case EFigureNames.BISHOP:
        new Bishop(currentPlayer.color, cell);
        break;
      case EFigureNames.KNIGHT:
        new Knight(currentPlayer.color, cell);
        break;
      case EFigureNames.QUEEN:
        new Queen(currentPlayer.color, cell);
        break;
      case EFigureNames.ROOK:
        new Rook(currentPlayer.color, cell);
        break;
      default:
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
      <div className={styles['figures-container']}>
        <button
          className={styles['figure-button']}
          onClick={() => chooseFigure(EFigureNames.BISHOP)}
          data-testid="bishop-btn"
          type="button"
        >
          <FontAwesomeIcon icon={faChessBishop} /> {t('bishop')}
        </button>
        <button
          className={styles['figure-button']}
          onClick={() => chooseFigure(EFigureNames.KNIGHT)}
          data-testid="knight-btn"
          type="button"
        >
          <FontAwesomeIcon icon={faChessKnight} /> {t('knight')}
        </button>
        <button
          className={styles['figure-button']}
          onClick={() => chooseFigure(EFigureNames.QUEEN)}
          data-testid="queen-btn"
          type="button"
        >
          <FontAwesomeIcon icon={faChessQueen} /> {t('queen')}
        </button>
        <button
          className={styles['figure-button']}
          onClick={() => chooseFigure(EFigureNames.ROOK)}
          data-testid="rook-btn"
          type="button"
        >
          <FontAwesomeIcon icon={faChessRook} /> {t('rook')}
        </button>
      </div>
    </ModalContainer>
  );
};
