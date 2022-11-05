import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from '../styles/notfound.module.scss';
import { useTitle } from '../hooks/useTitle';
import { DynoGame } from '../components/DynoGame/DynoGame';
import { isMobile } from '../utils/helpers';

export const NotFound = () => {
  useTitle('404');
  const { t } = useTranslation();

  const isMobileDevice = useMemo(() => {
    return isMobile();
  }, []);

  return (
    <div className="container">
      <div className={styles.page}>
        <div className={styles.numbers}>404</div>
        <div className={styles.info}>
          <h2 className={styles.title}>{t('sorry')}</h2>
          <p className={styles.text}>{t('page_not_found')}</p>
          <Link className={styles.link} to="/">
            {t('go_to_main')}
          </Link>
        </div>
      </div>
      {!isMobileDevice && <DynoGame />}
    </div>
  );
};
