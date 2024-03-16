import { useTranslation } from 'react-i18next';
import styles from '../assets/styles/life.module.scss';

import LifeGameBoard from '../components/LifeGameBoard';

const Life = () => {
  const { t } = useTranslation();

  return (
    <div className={`container ${styles.life}`}>
      <h2 className="page-title">{t('life_game')}</h2>
      <LifeGameBoard />
    </div>
  );
};

export default Life;
