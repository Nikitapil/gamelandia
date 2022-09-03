import React, { FC, useEffect, useRef } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import modalStyles from "../../styles/modal.module.scss";
interface ModalContainerProps {
  children: JSX.Element | string | React.ReactNode;
  title?: string;
  closeModal: () => void;
}

export const ModalContainer: FC<ModalContainerProps> = ({
  children,
  title = "",
  closeModal,
}) => {
  const modalref = useRef<HTMLDivElement>(null)
  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal()
    }
  }

  useEffect(() => {
    if (modalref.current) {
      modalref.current.focus()
    }
  }, [])

  return (
    <div className={modalStyles.modal} onClick={closeModal} onKeyDown={onKeyPress} tabIndex={0} ref={modalref}>
      <div
        className={modalStyles.modal__content}
        onClick={(e) => e.stopPropagation()}
        data-testid="modal-content"
      >
        <button
          className={modalStyles["modal__close-btn"]}
          onClick={closeModal}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h2 className={modalStyles.modal__title}>{title}</h2>
        {children}
      </div>
    </div>
  );
};
