import React, { useMemo } from 'react';
import styles from '../assets/styles/numbers.module.scss';
import { NumbersElemModel } from '../models/NumbersElemModel';
import {
  NUMBERS_CELL_SIZE,
  numberColors,
  NUMBERS_CELLS_GAP
} from '../constants';

interface NumbersElemProps {
  elem: NumbersElemModel;
}

export const NumbersElem = ({ elem }: NumbersElemProps) => {
  const style = useMemo(() => {
    const top = `${
      elem.y * NUMBERS_CELL_SIZE + (elem.y + 1) * NUMBERS_CELLS_GAP
    }px`;

    const left = `${
      elem.x * NUMBERS_CELL_SIZE + (elem.x + 1) * NUMBERS_CELLS_GAP
    }px`;

    const colorStyles = numberColors[elem.value] ?? {
      background:
        'radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%)',
      color: '#fff'
    };

    return { top, left, ...colorStyles };
  }, [elem.y, elem.x, elem.value]);

  return (
    <div className={styles.elem} style={style}>
      {elem.value}
    </div>
  );
};
