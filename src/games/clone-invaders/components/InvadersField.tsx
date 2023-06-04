import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InvadersBulletModel } from '../models/InvadersBulletModel';
import { InvadersFieldModel } from '../models/InvadersFieldModel';
import styles from '../assets/styles/invaders.module.scss';
import { InvadersBullet } from './InvadersBullet';
import { InvadersCell } from './InvadersCell';
import { InvadersGameOver } from './InvadersGameOver';
import { InvadersGun } from './InvadersGun';
import { AppButton } from '../../../components/UI/AppButton/AppButton';
import { useCreateScore } from '../../../score/hooks/useCreateScore';
import { EGamesNames } from '../../constants';
import { INVADERS_FIELD_HEIGHT, INVADERS_GUN_MIDDLE } from '../constants';

export const InvadersField = () => {
  const { t } = useTranslation();
  const createScore = useCreateScore();

  const [board, setBoard] = useState(new InvadersFieldModel());
  const [bullet, setBullet] = useState<InvadersBulletModel | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(350);

  const bulletInterval = useRef<null | ReturnType<typeof setInterval>>(null);
  const gameInterval = useRef<null | ReturnType<typeof setInterval>>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateBoard = useCallback(() => {
    const newBoard = board.copyBoard();
    setBoard(newBoard);
  }, [board]);

  const destroyBullet = useCallback(() => {
    bullet?.destroy();
    setBullet(null);
    if (bulletInterval.current) {
      clearInterval(bulletInterval.current);
    }
    bulletInterval.current = null;
  }, [bullet]);

  const onGameOver = useCallback(() => {
    setGameOver(true);
    destroyBullet();
    setBoard(new InvadersFieldModel());
    if (gameInterval.current) {
      clearInterval(gameInterval.current);
    }
    setTimer(350);
    createScore({
      value: score,
      gameName: EGamesNames.CLONE_INVADERS
    });
  }, [score, createScore, destroyBullet]);

  const move = useCallback(() => {
    board.move();
    updateBoard();
  }, [board, updateBoard]);

  const onStartGame = useCallback(() => {
    board.startGame();
    updateBoard();
    gameInterval.current = setInterval(() => move(), timer);
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, [board, move, timer, updateBoard]);

  const moveBullet = useCallback(() => {
    if (bullet?.isDestroyed) {
      destroyBullet();
      return;
    }
    if (bullet) {
      bullet.move();
      if (bullet.y === INVADERS_FIELD_HEIGHT) {
        destroyBullet();
        return;
      }
      const newBullet = bullet.copyBullet();
      setBullet(newBullet);
    }
  }, [bullet, destroyBullet]);

  const onGunMove = async (e: React.KeyboardEvent) => {
    if (e.code === 'ArrowRight') {
      board.gun.toRight();
      updateBoard();
    }
    if (e.code === 'ArrowLeft') {
      board.gun.toLeft();
      updateBoard();
    }
    if (e.code === 'Space') {
      if (!bullet) {
        const bull = new InvadersBulletModel(board.gun.x + INVADERS_GUN_MIDDLE);
        setBullet(bull);
      }
    }
  };

  useEffect(() => {
    if (board.isGameOver) {
      onGameOver();
    }
  }, [board.isGameOver, onGameOver]);

  useEffect(() => {
    if (bullet && !bulletInterval.current) {
      bulletInterval.current = setInterval(() => moveBullet(), 20);
    }
  }, [bullet, moveBullet]);

  useEffect(() => {
    if (board.isEmpty) {
      if (timer > 100) {
        setTimer((prev) => prev - 20);
      }
      destroyBullet();
      setBoard(new InvadersFieldModel());
      if (gameInterval.current) {
        clearInterval(gameInterval.current);
      }
      onStartGame();
    }
  }, [board.isEmpty, destroyBullet, onStartGame, timer]);

  const increaseScore = () => setScore((prev) => prev + 20);

  const closeModal = () => {
    setGameOver(false);
    setScore(0);
  };

  return (
    <div
      className={styles.invaders__field}
      onKeyDown={onGunMove}
      tabIndex={0}
      ref={containerRef}
    >
      {!board.isGameStarted && (
        <AppButton
          onClick={onStartGame}
          text="Start"
          color="transparent"
          customClass={styles.start}
        />
      )}
      {board.isGameStarted && (
        <div className={styles['invaders__field-cells']}>
          <p className={styles.score}>
            {t('score')}: {score}
          </p>
          {board.cells.map((row) =>
            row.map((cell) => (
              <InvadersCell
                increaseScore={increaseScore}
                bullet={bullet}
                destroyBullet={destroyBullet}
                cell={cell}
                key={cell.id}
              />
            ))
          )}
          {bullet && <InvadersBullet bullet={bullet} />}
          <InvadersGun gun={board.gun} />
        </div>
      )}
      <InvadersGameOver
        score={score}
        closeModal={closeModal}
        isOpened={gameOver}
      />
    </div>
  );
};
