import React from 'react';
import { NumbersBoard } from '../components/2048/NumbersBoard';
import styles from '../styles/numbersGame.module.scss';

export const NumbersGame = () => {
  return (
    <div className={`container ${styles.page}`}>
      <h1 className="page-title">2048 Game</h1>
      <NumbersBoard />
    </div>
  );
};
