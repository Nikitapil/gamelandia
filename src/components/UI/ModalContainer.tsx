import React, { FC } from "react";
import "../../styles/modal.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface ModalContainerProps {
  children: JSX.Element | string;
  title?: string;
  closeModal?: () => void;
}

export const ModalContainer: FC<ModalContainerProps> = ({
  children,
  title = "",
  closeModal,
}) => {
  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close-btn" onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h2 className="modal__title">{title}</h2>
        {children}
      </div>
    </div>
  );
};
