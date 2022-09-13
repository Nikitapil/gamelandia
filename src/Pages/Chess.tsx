import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChessBoardComponent } from '../components/Chess/ChessBoardComponent';
import { ChessTimer } from '../components/Chess/ChessTimer';
import { LostFigures } from '../components/Chess/LostFigures';
import { WinnerModal } from '../components/Chess/WinnerModal';
import { breadcrumbs } from '../constants/breadcrumbs';
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import { useTitle } from '../hooks/useTitle';
import { Board } from '../models/chess/Board';
import { Colors } from '../models/chess/Colors';
import { Player } from '../models/chess/Player';
import '../styles/chess.scss';

export const Chess = () => {
  const { t } = useTranslation();
  useTitle(t('chess'));
  useBreadcrumbs([
    breadcrumbs.main,
    breadcrumbs.chessTypes,
    breadcrumbs.chessOffline
  ]);
  const [board, setBoard] = useState(new Board());
  const [whitePlayer] = useState(new Player(Colors.WHITE));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      const winColor =
        currentPlayer?.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
      setWinner(winColor);
    }
  };

  const newGame = () => {
    setWinner('');
    setIsTimerModalOpen(true);
  };

  const swapPlayer = () => {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
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
        <button
          className="chess__give-up"
          data-testid="give-up-btn"
          type="button"
          onClick={() => endGame()}
        >
          {t('give_up')}
        </button>
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
      {winner && <WinnerModal newGame={newGame} color={winner} />}
    </div>
  );
};
