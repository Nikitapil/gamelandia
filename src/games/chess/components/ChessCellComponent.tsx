import React, { memo, useMemo } from 'react';
import { Cell } from '../models/Cell';
import styles from '../assets/styles/chess.module.scss';

interface IChessCellComponentsProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

export const ChessCellComponent = memo(({ cell, selected, click }: IChessCellComponentsProps) => {
  const className = useMemo(() => {
    const classes = [styles.cell, styles[cell.color]];
    if (selected) {
      classes.push(styles.selected);
    }
    if (cell.figure && cell.available) {
      classes.push(styles['attack-available']);
    }
    return classes.join(' ');
  }, [cell.available, cell.color, cell.figure, selected]);

  return (
    <div
      data-testid="chess-cell"
      className={className}
      onClick={() => click(cell)}
    >
      {!cell.figure && cell.available && (
        <div
          data-testid="available-dot"
          className={styles.available}
        />
      )}
      {cell.figure?.logo && (
        <img
          data-testid="figure-logo"
          src={cell.figure?.logo}
          alt={cell.figure?.name}
        />
      )}
    </div>
  );
});
