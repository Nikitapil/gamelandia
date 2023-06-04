import React, { useMemo } from 'react';
import { TetrisCellModel } from '../models/TetrisCellModel';
import tetrisStyle from '../assets/styles/tetris.module.scss';

interface ITetrisCellProps {
  cell: TetrisCellModel;
}

export const TetrisCell = ({ cell }: ITetrisCellProps) => {
  const colorClass = useMemo(() => {
    return tetrisStyle[`bg-${cell.elem?.color}`] || '';
  }, [cell.elem]);

  return <div className={`${tetrisStyle.cell} ${colorClass}`} />;
};
