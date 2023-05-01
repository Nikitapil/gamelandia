import React, { useMemo } from 'react';
import { TetrisCellModel } from '../models/TetrisCellModel';
import tetrisStyle from '../assets/styles/tetris.module.scss';

interface TetrisCellProps {
  cell: TetrisCellModel;
}

export const TetrisCell = ({ cell }: TetrisCellProps) => {
  const colorClass = useMemo(() => {
    return tetrisStyle[`bg-${cell.elem?.color}`] || '';
  }, [cell.elem]);

  return <div className={`${tetrisStyle.cell} ${colorClass}`} />;
};
