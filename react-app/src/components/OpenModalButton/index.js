import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  buttonIconClass,
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  buttonClass,
  modalClass
}) {
  const { setModalContent, setOnModalClose, setModalClass } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    setModalClass(modalClass);
    if (onButtonClick) onButtonClick();
  };

  return (
    <>
      {buttonText ? (<button onClick={onClick} className={buttonClass}>{buttonText}</button>) : (<button onClick={onClick} className={buttonClass}><i className={buttonIconClass}/></button>)}
    </>


  );
}

export default OpenModalButton;
