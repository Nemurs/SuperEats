import { GridLoader } from 'react-spinners';
import "./Loader.css";

const Loader = ({color}) => {
    return (
        <div className="loader-wrapper">
            <GridLoader color={color ? color : "#2dbe64"} />
        </div>
    )
}

export default Loader;
