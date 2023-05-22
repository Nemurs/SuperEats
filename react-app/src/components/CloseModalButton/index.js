import { useModal } from "../../context/Modal";
import "./CloseModalButton.css"

const CloseModalButton = () => {
    const { closeModal } = useModal();

    const handleClick = (e) => {
        e.preventDefault();
        closeModal();
    }

    return (
        <button className="close-button-x" onClick={handleClick}>
            ✖
        </button>
    )
}

export default CloseModalButton;
