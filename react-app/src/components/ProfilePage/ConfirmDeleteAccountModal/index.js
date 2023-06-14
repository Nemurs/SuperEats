import CloseModalButton from "../../CloseModalButton";
import "./ConfirmDeleteAccountModal.css";

const ConfirmDeleteAccountModal = () => {

    return (
        <div className="ConfirmDeleteAccountModal-wrapper">
            <CloseModalButton/>
            <h1>Are you sure?</h1>
            <div className="ConfirmDeleteAccountModal-button-wrapper">
                <button className="gray-button-square background-red">Yes, delete my account</button>
                <button className="black-button-square">Cancel</button>
            </div>
        </div>
    )
}

export default ConfirmDeleteAccountModal;
