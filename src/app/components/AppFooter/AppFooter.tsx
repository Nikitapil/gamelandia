import React from 'react';
import { FaGithub } from 'react-icons/fa';
import styles from './app-footer.module.scss';

export const AppFooter = () => {
  return (
    <footer className={styles.footer}>
      <a
        className={styles.github}
        href="https://github.com/Nikitapil/gamelandia"
        target="_blank"
        rel="noreferrer"
      >
        <FaGithub
          color="#fff"
          size="32"
        />
      </a>
    </footer>
  );
};
