import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChessBoardComponent } from '../components/ChessBoardComponent';
import { ChessTimer } from '../components/ChessTimer';
import { LostFigures } from '../components/LostFigures';
import { WinnerModal } from '../components/WinnerModal';
import { breadcrumbs } from '../../../constants/breadcrumbs';
import { useBreadcrumbs } from '../../../app/hooks/useBreadcrumbs';
import { useTitle } from '../../../hooks/useTitle';
import { Board } from '../models/Board';
import { Colors } from '../models/Colors';
import { Player } from '../models/Player';
import '../assets/styles/chess.scss';
import { AppButton } from '../../../components/UI/AppButton/AppButton';

export const Chess = () => {
  const { t } = useTranslation();
  useTitle(t('chess'));
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.chessTypes, breadcrumbs.chessOffline]);
  const [board, setBoard] = useState(new Board());
  const [whitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(true);
  const [winner, setWinner] = useState('');
  const restart = () => {
    setWinner('');
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  };

  const endGame = (color?: string) => {
    if (!color) {
      const winColor = currentPlayer?.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
      setWinner(winColor);
    }
  };

  const newGame = () => {
    setWinner('');
    setIsTimerModalOpen(true);
  };

  const swapPlayer = () => {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
  };

  return (
    <div className="chess container">
      <div className="chess_timer">
        <ChessTimer
          currentPlayer={currentPlayer}
          restart={restart}
          endGame={endGame}
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
      <div className="lost">
        <LostFigures title={t('black')} figures={board.lostBlackFigures} />
        <LostFigures title={t('white')} figures={board.lostWhightFigures} />
      </div>
      <WinnerModal isOpened={!!winner} newGame={newGame} color={winner} />
    </div>
  );
};
