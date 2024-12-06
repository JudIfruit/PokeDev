import React, { useState, useEffect } from "react";
import useFetch from "../../common/hooks/useFetch";
import { fetchPokemonsByGeneration } from "../../services/pokemonService";
import PokemonCard from "../components/PokemonCard";
import Header from "../../common/components/Header.jsx";
import Footer from "../../common/components/Footer.jsx";
import "./PokemonList.css";

const PokemonList = () => {
    const [generation, setGeneration] = useState(1); // Génération par défaut
    const { data, loading, error } = useFetch(() => fetchPokemonsByGeneration(generation));

    const handleGenerationChange = (gen) => {
        setGeneration(gen);
    };

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <div>
            <Header />
            <div className="pokemon-list-container">
                <h1>Liste des Pokémon - Génération {generation}</h1>

                {/* Navigation des générations */}
                <nav className="generation-nav">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((gen) => (
                        <button
                            key={gen}
                            className={`generation-button ${gen === generation ? 'active' : ''}`}
                            onClick={() => handleGenerationChange(gen)}
                        >
                            Génération {gen}
                        </button>
                    ))}
                </nav>

                <div className="pokemon-list">
                    {data.map((pokemon) => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PokemonList;
