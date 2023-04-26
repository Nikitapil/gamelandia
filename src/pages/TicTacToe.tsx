import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TicTacBoard } from '../components/TicTacToe/TicTacBoard';
import { breadcrumbs } from '../constants/breadcrumbs';
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import { useTitle } from '../hooks/useTitle';
import { TicBoard } from '../models/ticTacToe/TicBoard';
import tictacStyles from '../styles/tictac.module.scss';
import { AppButton } from '../components/UI/AppButton';

export const TicTacToe = () => {
  const { t } = useTranslation();
  useTitle(t('tic_tac'));
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.ticTac]);
  const [board, setBoard] = useState(new TicBoard());
  const [winner, setWinner] = useState('');
  const [draw, setDraw] = useState(false);
  const restart = () => {
    const newBoard = new TicBoard();
    newBoard.initCells();
    setBoard(newBoard);
    setWinner('');
    setDraw(false);
  };

  useEffect(() => {
    restart();
  }, []);

  return (
    <div
      className={`container ${tictacStyles['tic-tac-container']}`}
      data-testid="tic-tac-page"
    >
      <h1 className={tictacStyles['tic-tac__title']}>{t('tic_tac')}</h1>
      <AppButton size="lg" onClick={restart}>
        {t('restart_game')}
      </AppButton>
      <TicTacBoard
        winner={winner}
        setWinner={setWinner}
        setBoard={setBoard}
        board={board}
        draw={draw}
        setDraw={setDraw}
      />
    </div>
  );
};
