import React, { useMemo } from 'react';
import styles from '../../../styles/numbersGame.module.scss';
import { NumbersElemModel } from '../../../models/2048/NumbersElemModel';
import { numberColors } from '../constants';

interface NumbersElemProps {
  elem: NumbersElemModel;
}

export const NumbersElem = ({ elem }: NumbersElemProps) => {
  const style = useMemo(() => {
    const top = `${elem.y * 70 + (elem.y + 1) * 10}px`;
    const left = `${elem.x * 70 + (elem.x + 1) * 10}px`;
    const colorStyles = numberColors[elem.value]
      ? numberColors[elem.value]
      : {
          background:
            'radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%)',
          color: '#fff'
        };
    return { top, left, ...colorStyles };
  }, [elem.y, elem.x]);

  return (
    <div className={styles.elem} style={style}>
      {elem.value}
    </div>
  );
};
