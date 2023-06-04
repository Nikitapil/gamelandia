import React from 'react';
import styles from './breadcrumbs.module.scss';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { appSelector } from '../../../store/selectors';
import { BreadcrumbLink } from './BreadcrumbLink';

export const Breadcrumbs = () => {
  const { breadcrumbs } = useAppSelector(appSelector);

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        {breadcrumbs?.map((breadcrumb, idx) => {
          return (
            <BreadcrumbLink
              key={breadcrumb.id}
              breadcrumb={breadcrumb}
              idx={idx}
              lastIdx={breadcrumbs.length - 1}
            />
          );
        })}
      </div>
    </div>
  );
};
