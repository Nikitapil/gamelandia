import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './notfound.module.scss';
import { useTitle } from '../../../hooks/useTitle';
import { DynoGame } from '../../../components/DynoGame/DynoGame';
import { ERoutes } from '../../../constants/routes';

export const NotFound = () => {
  useTitle('404');
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className={styles.page}>
        <div className={styles.numbers}>404</div>
        <div className={styles.info}>
          <h2 className={styles.title}>{t('sorry')}</h2>
          <p className={styles.text}>{t('page_not_found')}</p>
          <Link className={styles.link} to={`${ERoutes.MAIN}`}>
            {t('go_to_main')}
          </Link>
        </div>
      </div>
      <DynoGame />
    </div>
  );
};
