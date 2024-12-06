import React, { useEffect, useState, useCallback } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import useFetch from "../../common/hooks/useFetch";
import { fetchPokemons, fetchTypes } from "../../services/pokemonService";
import "./HomePage.css";

const HomePage = () => {
    const { data: randomPokemons, loading, error } = useFetch(fetchPokemons, 6);
    const [randomTypes, setRandomTypes] = useState([]);

    const getRandomTypes = useCallback(async () => {
        try {
            const types = await fetchTypes(3); // Fetching random types with limit
            setRandomTypes(types);
        } catch (error) {
            console.error("Error fetching types:", error);
        }
    }, []);

    useEffect(() => {
        getRandomTypes();
    }, [getRandomTypes]);

    const renderPokemons = () => {
        if (randomPokemons && randomPokemons.length > 0) {
            return randomPokemons.map((pokemon) => (
                <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id} className="item">
                    <img src={pokemon.image} alt={pokemon.name} className="pokemonImage" />
                    <p>{pokemon.name}</p>
                </Link>
            ));
        }
        return <p>Aucun Pokémon aléatoire trouvé.</p>;
    };

    const renderTypes = () => {
        if (randomTypes.length > 0) {
            return randomTypes.map((type) => (
                <Link to={`/type/${type.name}`} key={type.name} className="item">
                    <img src={type.image} alt={type.name} className="typeImage" />
                    <p>{type.name}</p>
                </Link>
            ));
        }
        return <p>Aucun type de Pokémon trouvé.</p>;
    };

    return (
        <div className="layout">
            <Header />
            <main className="main">
                {loading ? (
                    <p className="loadingText">Chargement des données...</p>
                ) : error ? (
                    <p className="errorText">Erreur lors de la récupération des données : {error}</p>
                ) : (
                    <div className="container">
                        {/* Pokémon Section */}
                        <section className="section">
                            <h2>
                                <Link to="/pokemon" className="sectionTitle">
                                    Liste des Pokémons
                                </Link>
                            </h2>
                            <div className="ContainerItems">{renderPokemons()}</div>
                        </section>

                        {/* Types Section */}
                        <section className="section">
                            <h2>
                                <Link to="/types" className="sectionTitle">
                                    Liste des Types
                                </Link>
                            </h2>
                            <div className="ContainerItems2">{renderTypes()}</div>
                        </section>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
