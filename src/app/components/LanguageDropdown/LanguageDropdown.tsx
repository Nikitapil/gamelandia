import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './language-dropdown.module.scss';

export const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = async (language: string) => {
    await i18n.changeLanguage(language);
    setIsOpen(false);
  };

  const closeOutside = (e: MouseEvent) => {
    if (!(e.target as Element).closest('.language-dropdown')) {
      setIsOpen(false);
    }
  };

  const changeState = () => setIsOpen(!isOpen);

  useEffect(() => {
    document.addEventListener('click', closeOutside);
    return () => document.removeEventListener('click', closeOutside);
  }, []);

  return (
    <div className={`${styles['language-dropdown']} language-dropdown`}>
      <button
        type="button"
        className={styles['language-dropdown__open']}
        onClick={changeState}
      >
        <span className={styles.lang}>{i18n.language}</span>{' '}
        <FontAwesomeIcon icon={faGlobe} />
      </button>
      {isOpen && (
        <div className={styles['language-dropdown__body']}>
          <button
            type="button"
            className={i18n.language === 'ru' ? styles.active : ''}
            onClick={() => changeLanguage('ru')}
          >
            RU
          </button>
          <button
            type="button"
            className={i18n.language === 'en' ? styles.active : ''}
            onClick={() => changeLanguage('en')}
          >
            EN
          </button>
        </div>
      )}
    </div>
  );
};
