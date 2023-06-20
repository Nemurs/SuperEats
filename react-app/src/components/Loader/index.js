import { GridLoader } from 'react-spinners';
import "./Loader.css";

const Loader = () => {
    return (
        <div className="loader-wrapper">
            <GridLoader color="#2dbe64" />
        </div>
    )
}

export default Loader;
