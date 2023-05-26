import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
<<<<<<< Updated upstream
  buttonClass
}) {
  const { setModalContent, setOnModalClose } = useModal();
=======
  buttonClass,
  modalClass
}) {
  const { setModalContent, setOnModalClose, setModalClass } = useModal();
>>>>>>> Stashed changes

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
<<<<<<< Updated upstream
=======
    setModalClass(modalClass);
>>>>>>> Stashed changes
    if (onButtonClick) onButtonClick();
  };

  return (
    <button onClick={onClick} className={buttonClass}>{buttonText}</button>
  );
}

export default OpenModalButton;
