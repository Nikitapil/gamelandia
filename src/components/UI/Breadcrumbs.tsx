import React from 'react';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { appSelector } from '../../redux/appStore/appSelectors';
import breadcrumbsStyles from '../../styles/breadcrumbs.module.scss';

export const Breadcrumbs = () => {
  const { breadcrumbs } = useTypedSelector(appSelector);
  return (
    <div className={breadcrumbsStyles.breadcrumbs}>
      {breadcrumbs.length > 1 &&
        breadcrumbs?.map((breadcrumb, idx) => {
          if (idx < breadcrumbs.length - 1) {
            return (
              <Link
                className={breadcrumbsStyles.link}
                key={breadcrumb.path}
                to={breadcrumb.path}
              >
                {breadcrumb.name} /
              </Link>
            );
          }
          return (
            <p key={breadcrumb.path} className={breadcrumbsStyles.text}>
              {breadcrumb.name}
            </p>
          );
        })}
    </div>
  );
};
