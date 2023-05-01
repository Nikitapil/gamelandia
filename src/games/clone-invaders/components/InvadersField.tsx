import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InvadersBulletModel } from '../models/InvadersBulletModel';
import { InvadersFieldModel } from '../models/InvadersFieldModel';
import invadersStyles from '../assets/styles/invaders.module.scss';
import { ModalContainer } from '../../../components/UI/ModalContainer';
import { InvadersBullet } from './InvadersBullet';
import { InvadersCell } from './InvadersCell';
import { InvadersGameOver } from './InvadersGameOver';
import { InvadersGun } from './InvadersGun';
import { AppButton } from '../../../components/UI/AppButton';
import { useCreateScore } from '../../../score/hooks/useCreateScore';
import { EGamesNames } from '../../constants';

export const InvadersField = () => {
  const [board, setBoard] = useState(new InvadersFieldModel());
  const [bullet, setBullet] = useState<InvadersBulletModel | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(350);
  const bulletInterval = useRef<null | ReturnType<typeof setInterval>>(null);
  const gameInterval = useRef<null | ReturnType<typeof setInterval>>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const createScore = useCreateScore();
  const { t } = useTranslation();
  const move = useCallback(() => {
    board.move();
    const newBoard = board.copyBoard();
    setBoard(newBoard);
  }, [board]);

  const onStartGame = useCallback(() => {
    board.startGame();
    const newBoard = board.copyBoard();
    setBoard(newBoard);
    gameInterval.current = setInterval(() => move(), timer);
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, [board, move, timer]);

  const destroyBullet = useCallback(() => {
    bullet?.destroy();
    setBullet(null);
    clearInterval(bulletInterval.current!);
    bulletInterval.current = null;
  }, [bullet]);

  const moveBullet = useCallback(() => {
    if (bullet?.isDestroyed) {
      destroyBullet();
      return;
    }
    if (bullet) {
      bullet!.move();
      if (bullet.y === 400) {
        destroyBullet();
        return;
      }
      const newBullet = bullet!.copyBullet();
      setBullet(newBullet);
    }
  }, [bullet, destroyBullet]);

  const onGunMove = (e: React.KeyboardEvent) => {
    if (e.code === 'ArrowRight') {
      board.gun.toRight();
      const newBoard = board.copyBoard();
      setBoard(newBoard);
    }
    if (e.code === 'ArrowLeft') {
      board.gun.toLeft();
      const newBoard = board.copyBoard();
      setBoard(newBoard);
    }
    if (e.code === 'Space') {
      if (!bullet) {
        const bull = new InvadersBulletModel(board.gun.x + 12);
        setBullet(bull);
      }
    }
  };

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
      clearInterval(gameInterval.current!);
      onStartGame();
    }
  }, [board.isEmpty, destroyBullet, onStartGame, timer]);

  const increaseScore = () => setScore((prev) => prev + 20);

  useEffect(() => {
    if (gameOver) {
      destroyBullet();
      setBoard(new InvadersFieldModel());
      clearInterval(gameInterval.current!);
      setTimer(350);
      createScore({
        value: score,
        gameName: EGamesNames.CLONE_INVADERS
      });
    }
  }, [createScore, destroyBullet, gameOver, score]);

  const closeModal = () => {
    setGameOver(false);
    setScore(0);
  };

  return (
    <div
      className={invadersStyles.invaders__field}
      onKeyDown={onGunMove}
      tabIndex={0}
      ref={containerRef}
    >
      {!board.isGameStarted && (
        <AppButton
          onClick={onStartGame}
          text="Start"
          color="transparent"
          customClass={invadersStyles.start}
        />
      )}
      {board.isGameStarted && (
        <div className={invadersStyles['invaders__field-cells']}>
          <p className={invadersStyles.score}>
            {t('score')}: {score}
          </p>
          {board.cells.map((row) =>
            row.map((cell) => (
              <InvadersCell
                gameOver={() => setGameOver(true)}
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
      <ModalContainer closeModal={closeModal} isOpened={gameOver}>
        <InvadersGameOver score={score} closeModal={closeModal} />
      </ModalContainer>
    </div>
  );
};
