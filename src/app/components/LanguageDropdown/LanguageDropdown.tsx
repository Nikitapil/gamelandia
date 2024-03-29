import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './language-dropdown.module.scss';
import { useClickOutside } from '../../../hooks/useClickOutside';

export const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const changeLanguage = async (language: string) => {
    await i18n.changeLanguage(language);
    setIsOpen(false);
  };

  const changeState = () => setIsOpen(!isOpen);

  return (
    <div
      className={`${styles['language-dropdown']}`}
      ref={dropdownRef}
    >
      <button
        type="button"
        className={styles['language-dropdown__open']}
        onClick={changeState}
      >
        <span className={styles.lang}>{i18n.language}</span> <FontAwesomeIcon icon={faGlobe} />
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
