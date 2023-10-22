import React, { ReactNode } from 'react';
import { AppHeader } from '../AppHeader/AppHeader';
import styles from '../../assets/styles/app-styles.module.scss';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { LanguageDropdown } from '../LanguageDropdown/LanguageDropdown';
import { AppFooter } from '../AppFooter/AppFooter';

interface CommonLayoutProps {
  children: ReactNode;
}

export const CommonLayout = ({ children }: CommonLayoutProps) => {
  return (
    <div className="common">
      <AppHeader />
      <main className="main">
        <div className={styles.breadcrumbs}>
          <Breadcrumbs />
          <LanguageDropdown />
        </div>
        {children}
      </main>
      <AppFooter />
    </div>
  );
};
