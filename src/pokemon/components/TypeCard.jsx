import { Link } from "react-router-dom";
import "./TypeCard.css";

const TypeCard = ({ type }) => {
    return (
        <div className="type-card">
            <Link to={`/type/${type.name}`} className="type-link">
                <div className="type-card-content">
                    <img
                        src={type.images}
                        alt={type.name}
                        className="type-image"
                    />
                    <h3 className="type-name">{type.name}</h3>
                </div>
            </Link>
        </div>
    );
};

export default TypeCard;
