import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChessBoardComponent } from '../components/ChessBoardComponent';
import { ChessTimer } from '../components/ChessTimer';
import { LostFigures } from '../components/lost-figures/LostFigures';
import { WinnerModal } from '../components/WinnerModal';
import { breadcrumbs } from '../../../constants/breadcrumbs';
import { useBreadcrumbs } from '../../../app/hooks/useBreadcrumbs';
import { useTitle } from '../../../hooks/useTitle';
import { Board } from '../models/Board';
import { EChessColors } from '../models/EChessColors';
import { Player } from '../models/Player';
import '../assets/styles/chess.scss';
import { AppButton } from '../../../components/UI/AppButton/AppButton';
import styles from '../assets/styles/chess.module.scss';

export const Chess = () => {
  const { t } = useTranslation();
  useTitle(t('chess'));
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.chessTypes, breadcrumbs.chessOffline]);

  const [board, setBoard] = useState(new Board());
  const [whitePlayer] = useState(new Player(EChessColors.WHITE));
  const [blackPlayer] = useState(new Player(EChessColors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(true);
  const [winner, setWinner] = useState('');

  const restart = () => {
    setWinner('');
    const newBoard = new Board();
    newBoard.initNewGame();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  };

  const endGame = () => {
    const winColor =
      currentPlayer?.color === EChessColors.WHITE ? EChessColors.BLACK : EChessColors.WHITE;
    setWinner(winColor);
  };

  const newGame = () => {
    setWinner('');
    setIsTimerModalOpen(true);
  };

  const swapPlayer = () => {
    setCurrentPlayer(currentPlayer?.color === EChessColors.WHITE ? blackPlayer : whitePlayer);
  };

  return (
    <div className={`${styles.chess} container`}>
      <div className={styles.chess_timer}>
        <ChessTimer
          currentPlayer={currentPlayer}
          restart={restart}
          isModalOpen={isTimerModalOpen}
          setIsModalOpen={setIsTimerModalOpen}
          setWinner={setWinner}
        />
        <AppButton
          color="danger"
          fullWidth
          size="lg"
          testId="give-up-btn"
          type="button"
          onClick={() => endGame()}
        >
          {t('give_up')}
        </AppButton>
      </div>
      <ChessBoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <div className={styles.lost}>
        <LostFigures
          title={t('black')}
          figures={board.lostBlackFigures}
        />
        <LostFigures
          title={t('white')}
          figures={board.lostWhiteFigures}
        />
      </div>
      <WinnerModal
        isOpened={!!winner}
        newGame={newGame}
        color={winner}
      />
    </div>
  );
};
