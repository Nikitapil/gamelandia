import styles from '../assets/styles/styles.module.scss';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../constants';

const BrickGame = () => {
  return (
    <div>
      <div className={`container ${styles.brick}`}>
        <h2 className="page-title">Brick Game</h2>
        <canvas
          className={styles.canvas}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        />
      </div>
    </div>
  );
};

export default BrickGame;
