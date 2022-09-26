import React from 'react';
import flappyStyles from '../styles/flappy.module.scss';
import { FlappyField } from '../components/flappy/FlappyField';
import { useTitle } from '../hooks/useTitle';
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import { breadcrumbs } from '../constants/breadcrumbs';

export const FlappyBird = () => {
  useTitle('Flappy Bird');
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.flappy]);
  return (
    <div className={`container ${flappyStyles['flappy-container']}`}>
      <h2 className="page-title">FlappyBird</h2>
      <FlappyField />
    </div>
  );
};
