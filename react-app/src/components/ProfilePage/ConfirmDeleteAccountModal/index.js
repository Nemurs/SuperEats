import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";
import { deleteAccountThunk } from "../../../store/session";
import CloseModalButton from "../../CloseModalButton";
import "./ConfirmDeleteAccountModal.css";

const ConfirmDeleteAccountModal = ({userId}) => {
    const {closeModal} = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    if (userId <=9 ) {
        closeModal();
    }

    const clickDeleteAccount = async (e) => {
        e.preventDefault()
        let resp = await dispatch(deleteAccountThunk(userId))
        if (resp?.errors){
            return;
        }
        closeModal()
        history.push("/")
    }

    const clickCancel = async (e) => {
        e.preventDefault()
        closeModal();
        return;
    }

    return (
        <div className="ConfirmDeleteAccountModal-wrapper">
            <CloseModalButton/>
            <h1>Are you sure?</h1>
            <div className="ConfirmDeleteAccountModal-button-wrapper">
                <button className="gray-button-square background-red" onClick={clickDeleteAccount}>Yes, delete my account</button>
                <button className="black-button-square" onClick={clickCancel}>Cancel</button>
            </div>
        </div>
    )
}

export default ConfirmDeleteAccountModal;
