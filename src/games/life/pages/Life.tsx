import React from 'react';
import styles from '../assets/styles/life.module.scss';
import LifeGameBoard from '../components/LifeGameBoard';

// TODO i18n
const Life = () => {
  return (
    <div className={`container ${styles.life}`}>
      <h2 className="page-title">Life game</h2>
      <LifeGameBoard />
    </div>
  );
};

export default Life;
