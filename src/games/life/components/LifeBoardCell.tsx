import styles from '../assets/styles/life.module.scss';

import { LifeCell } from '../models/LifeCell';

interface ILifeBoardCellProps {
  cell: LifeCell;
  update: () => void;
}

const LifeBoardCell = ({ cell, update }: ILifeBoardCellProps) => {
  const setIsAlive = () => {
    cell.setIsAlive(true);
    update();
  };

  return (
    <div
      className={`${styles.cell} ${cell.isAlive ? styles.alive : ''}`}
      onClick={setIsAlive}
    />
  );
};

export default LifeBoardCell;
