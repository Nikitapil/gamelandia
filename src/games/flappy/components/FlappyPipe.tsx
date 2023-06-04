import React, { useMemo } from 'react';
import styles from '../assets/styles/flappy.module.scss';
import { FlappyPipeModel } from '../models/FlappyPipeModel';

interface IFlappyPipeProps {
  pipe: FlappyPipeModel;
}

export const FlappyPipe = ({ pipe }: IFlappyPipeProps) => {
  const pipeStyles = useMemo(() => {
    return {
      right: `${pipe.right}px`
    };
  }, [pipe.right]);

  const topPipeStyles = useMemo(() => {
    return {
      height: `${pipe.topHeight}px`
    };
  }, [pipe.topHeight]);

  const bottomPipeStyles = useMemo(() => {
    return {
      height: `${pipe.bottomHeight}px`
    };
  }, [pipe.bottomHeight]);

  return (
    <div
      className={styles.pipe}
      style={pipeStyles}
    >
      <div
        className={styles.pipe__top}
        style={topPipeStyles}
      />
      <div
        className={styles.pipe__bottom}
        style={bottomPipeStyles}
      />
    </div>
  );
};
