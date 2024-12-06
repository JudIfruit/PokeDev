import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../common/hooks/useFetch";
import { fetchPokemonDetails } from "../../services/pokemonService";
import "./PokemonDetail.css";
import Header from "../../common/components/Header.jsx";
import Footer from "../../common/components/Footer.jsx";

const PokemonDetail = () => {
    const { pokemonName, id } = useParams();
    const param = pokemonName || id;
    const navigate = useNavigate();
    const { data, loading, error } = useFetch(fetchPokemonDetails, param);

    if (loading) return <p>Chargement...</p>;

    if (error) {
        alert("Aucun Pokémon trouvé avec ce nom. Vous serez redirigé vers la liste.");
        navigate("/pokemon");
        return null;
    }

    const types = data?.apiTypes || [];

    return (
        <div>
            <Header />

            <div className="pokemon-detail">
                <div className="Pokemon-name">
                    <h1 className="pokemon-info">{data.name}</h1>
                    <img src={data.image} alt={data.name} />
                </div>

                <div className="pokemon-info">
                    <div className="pokemon-types">
                        {types.length > 0 ? (
                            types.map((type) => (
                                <span key={type.name} className="pokemon-type">
                                    <img className="image-type" src={type.image} alt={type.name} />
                                    {type.name}
                                </span>
                            ))
                        ) : (
                            <p>Aucun type trouvé pour ce Pokémon.</p>
                        )}
                    </div>

                    <div className="pokemon-stats">
                        <div className="stat">
                            <p>PV :</p>
                            <p className="stat-value">{data.stats.HP}</p>
                        </div>
                        <div className="stat">
                            <p>Attaque :</p>
                            <p className="stat-value">{data.stats.attack}</p>
                        </div>
                        <div className="stat">
                            <p>Défense :</p>
                            <p className="stat-value">{data.stats.defense}</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PokemonDetail;
