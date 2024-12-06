import React, { useEffect, useState } from "react";
import Footer from "../../common/components/Footer";
import Header from "../../common/components/Header";
import { Link } from "react-router-dom";
import { fetchTypes } from "../../services/pokemonService";
import "./PokemonTypes.css";

const TypesPage = () => {
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllTypes = async () => {
            try {
                const data = await fetchTypes();
                setTypes(data); // On récupère tous les types
                setLoading(false);
            } catch (error) {
                setError("Erreur lors de la récupération des types.");
                setLoading(false);
            }
        };

        fetchAllTypes();
    }, []);

    return (
        <div className="layout">
            <Header />
            <main className="main">
                {loading ? (
                    <p className="loadingText">Chargement des types...</p>
                ) : error ? (
                    <p className="errorText">{error}</p>
                ) : (
                    <div className="container">
                        <section className="section">
                            <h2 className="sectionTitle">Liste des Types</h2>
                            <div className="itemsContainer">
                                {types && types.length > 0 ? (
                                    types.map((type) => (
                                        <Link to={`/type/${type.name}`} key={type.name} className="item">
                                            <img
                                                src={type.image}
                                                alt={type.name}
                                                className="typeImage"
                                            />
                                            <p>{type.name}</p>
                                        </Link>
                                    ))
                                ) : (
                                    <p>Aucun type trouvé.</p>
                                )}
                            </div>
                        </section>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default TypesPage;
