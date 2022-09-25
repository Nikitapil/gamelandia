import React from 'react';
import flappyStyles from '../styles/flappy.module.scss';
import { FlappyField } from '../components/flappy/FlappyField';

export const FlappyBird = () => {
  return (
    <div className={`container ${flappyStyles['flappy-container']}`}>
      <h2 className="page-title">FlappyBird</h2>
      <FlappyField />
    </div>
  );
};
