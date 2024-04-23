import { useMemo } from 'react';

import styles from '../assets/styles/styles.module.scss';

interface IAsteroidHealthBarProps {
  currentHealth: number;
  maxHealth: number;
}

const AsteroidHealthBar = ({ currentHealth, maxHealth }: IAsteroidHealthBarProps) => {
  const currentHealthPercent = useMemo(() => {
    return (Math.floor(currentHealth) / maxHealth) * 100;
  }, [currentHealth, maxHealth]);

  const bgColor = useMemo(() => {
    if (currentHealthPercent < 30) {
      return '#ff3213';
    }
    if (currentHealthPercent < 60) {
      return '#ffd500';
    }
    return '#3bf851';
  }, [currentHealthPercent]);

  return (
    <div className={styles['health-bar']}>
      <div style={{ width: `${currentHealthPercent}%`, background: bgColor }} />
    </div>
  );
};

export default AsteroidHealthBar;
