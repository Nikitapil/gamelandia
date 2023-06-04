import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronDown,
  faCircleChevronLeft,
  faCircleChevronRight,
  faCircleChevronUp
} from '@fortawesome/free-solid-svg-icons';
import styles from './mobile-buttons.module.scss';
import { EMobileButtonsDirections } from './constants';

interface IMobileButtonsProps {
  onClick: (e: null, name: EMobileButtonsDirections) => void;
}

export const MobileButtons = ({ onClick }: IMobileButtonsProps) => {
  return (
    <div className={styles['buttons-container']}>
      <button
        onClick={() => onClick(null, EMobileButtonsDirections.UP)}
        className={styles.btn}
        type="button"
      >
        <FontAwesomeIcon icon={faCircleChevronUp} />
      </button>
      <div className={styles['side-buttons']}>
        <button
          onClick={() => onClick(null, EMobileButtonsDirections.LEFT)}
          className={styles.btn}
          type="button"
        >
          <FontAwesomeIcon icon={faCircleChevronLeft} />
        </button>
        <button
          onClick={() => onClick(null, EMobileButtonsDirections.RIGHT)}
          className={styles.btn}
          type="button"
        >
          <FontAwesomeIcon icon={faCircleChevronRight} />
        </button>
      </div>
      <button
        onClick={() => onClick(null, EMobileButtonsDirections.DOWN)}
        className={styles.btn}
        type="button"
      >
        <FontAwesomeIcon icon={faCircleChevronDown} />
      </button>
    </div>
  );
};
