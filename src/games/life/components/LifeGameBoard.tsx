import React, { useEffect, useState } from 'react';
import { LifeBoard } from '../models/LifeBoard';
import LifeBoardCell from './LifeBoardCell';
import styles from '../assets/styles/life.module.scss';
import { AppButton } from '../../../components/UI/AppButton/AppButton';

const LifeGameBoard = () => {
  const [game, setGame] = useState(new LifeBoard());
  const [gameInterval, setGameInterval] = useState<ReturnType<typeof setInterval> | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const initBoard = () => {
    const newGame = new LifeBoard();
    newGame.createCells();
    setGame(newGame);
  };

  const onUpdate = () => {
    setGame(game.updateBoard());
  };

  const doCellsStep = () => {
    if (game.cells.length) {
      game.moveCells();
      onUpdate();
    }
  };

  const onStartMoving = () => {
    if (gameInterval) {
      clearInterval(gameInterval);
    }
    setIsGameStarted(true);
    const interval = setInterval(doCellsStep, 500);
    setGameInterval(interval);
  };

  const restart = () => {
    setIsGameStarted(false);
    if (gameInterval) {
      clearInterval(gameInterval);
      setGameInterval(null);
    }
    initBoard();
  };

  useEffect(() => {
    initBoard();
  }, []);

  return (
    <div>
      {!isGameStarted && <AppButton onClick={onStartMoving}>Start</AppButton>}
      {isGameStarted && <AppButton onClick={restart}>Restart</AppButton>}
      <div className={styles.board}>
        {game.cells.map((row) => {
          return row.map((cell) => (
            <LifeBoardCell
              key={cell.id}
              cell={cell}
              update={onUpdate}
            />
          ));
        })}
      </div>
    </div>
  );
};

export default LifeGameBoard;
