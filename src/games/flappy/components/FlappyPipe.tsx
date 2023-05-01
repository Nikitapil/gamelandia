import React, { useMemo } from 'react';
import flappyStyles from '../assets/styles/flappy.module.scss';
import { FlappyPipeModel } from '../models/FlappyPipeModel';

interface FlappyPipeProps {
  pipe: FlappyPipeModel;
}

export const FlappyPipe = ({ pipe }: FlappyPipeProps) => {
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
    <div className={flappyStyles.pipe} style={pipeStyles}>
      <div className={flappyStyles.pipe__top} style={topPipeStyles} />
      <div className={flappyStyles.pipe__bottom} style={bottomPipeStyles} />
    </div>
  );
};
