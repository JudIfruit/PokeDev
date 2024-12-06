import { Link } from "react-router-dom";
import "./PokemonCard.css";

const PokemonCard = ({ pokemon }) => {
    return (
        <div className="pokemon-card">
            <Link to={`/pokemon/${pokemon.name}`} className="pokemon-link">
                <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="pokemon-image"
                />
                <h3 className="pokemon-name">{pokemon.name}</h3>
            </Link>
        </div>
    );
};

export default PokemonCard;
