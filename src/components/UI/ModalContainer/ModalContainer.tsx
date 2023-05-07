import { FC, ReactNode, useRef, KeyboardEvent } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Transition } from 'react-transition-group';
import styles from './modal.module.scss';
import '../../../assets/styles/transitions.scss';
import { useFocus } from '../../../hooks/useFocus';

interface ModalContainerProps {
  children: JSX.Element | string | ReactNode;
  closeModal: () => void;
  isOpened: boolean;
  title?: string;
  preventClosing?: boolean;
}

export const ModalContainer: FC<ModalContainerProps> = ({
  children,
  closeModal,
  preventClosing,
  isOpened,
  title = ''
}) => {
  const modalref = useRef<HTMLDivElement>(null);
  useFocus(modalref);

  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && !preventClosing) {
      closeModal();
    }
  };

  const onClose = () => {
    if (!preventClosing) {
      closeModal();
    }
  };

  return (
    <Transition in={isOpened} timeout={200} unmountOnExit>
      {(state) => (
        <div
          className={`${styles.modal} ${state} modal`}
          onClick={onClose}
          onKeyDown={onKeyPress}
          tabIndex={0}
          ref={modalref}
        >
          <div
            className={`${styles.modal__content} modal__content`}
            onClick={(e) => e.stopPropagation()}
            data-testid="modal-content"
          >
            {!preventClosing && (
              <button
                className={styles['modal__close-btn']}
                onClick={onClose}
                type="button"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            )}
            <h2 className={styles.modal__title}>{title}</h2>
            {children}
          </div>
        </div>
      )}
    </Transition>
  );
};
