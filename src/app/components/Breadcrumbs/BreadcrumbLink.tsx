import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IBreabcrumb } from '../../types';
import styles from './breadcrumbs.module.scss';

interface IBreadcrumbLinkProps {
  breadcrumb: IBreabcrumb;
  idx: number;
  lastIdx: number;
}

export const BreadcrumbLink = ({
  breadcrumb,
  idx,
  lastIdx
}: IBreadcrumbLinkProps) => {
  const { t } = useTranslation();

  if (idx === lastIdx) {
    return (
      <p key={breadcrumb.id} className={styles.text}>
        {t(breadcrumb.name)}
      </p>
    );
  }

  return (
    <Link className={styles.link} key={breadcrumb.id} to={breadcrumb.path}>
      {t(breadcrumb.name)} /
    </Link>
  );
};
