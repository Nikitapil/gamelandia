import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import breadcrumbsStyles from './breadcrumbs.module.scss';
// import { LanguageDropdown } from '../AppHeader/LanguageDropdown';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { appSelector } from '../../../store/selectors';

export const Breadcrumbs = () => {
  const { breadcrumbs } = useAppSelector(appSelector);
  const { t } = useTranslation();
  return (
    <div className={breadcrumbsStyles.container}>
      <div className={breadcrumbsStyles.breadcrumbs}>
        {breadcrumbs.length > 1 &&
          breadcrumbs?.map((breadcrumb, idx) => {
            if (idx < breadcrumbs.length - 1) {
              return (
                <Link
                  className={breadcrumbsStyles.link}
                  key={breadcrumb.id}
                  to={breadcrumb.path}
                >
                  {t(breadcrumb.name)} /
                </Link>
              );
            }
            return (
              <p key={breadcrumb.id} className={breadcrumbsStyles.text}>
                {t(breadcrumb.name)}
              </p>
            );
          })}
      </div>
      {/* <LanguageDropdown /> */}
    </div>
  );
};
