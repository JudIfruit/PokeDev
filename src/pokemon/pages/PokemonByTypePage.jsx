import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPokemonsByType } from "../../services/pokemonService"; // Fonction pour récupérer les pokémons par type
import PokemonCard from "../components/PokemonCard";
import Header from "../../common/components/Header.jsx";
import Footer from "../../common/components/Footer.jsx";
import "./PokemonByTypePage.css";

const PokemonByTypePage = () => {
    const { type } = useParams(); // Récupère le type depuis l'URL
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const data = await fetchPokemonsByType(type); // Récupère les Pokémon par type
                setPokemons(data);
                setLoading(false);
            } catch (err) {
                setError("Erreur lors de la récupération des Pokémon de ce type.");
                setLoading(false);
            }
        };

        fetchPokemons();
    }, [type]); // Re-exécute lorsqu'on change de type

    if (loading) return <p>Chargement des Pokémon...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <div>
            <Header />
            <div className="pokemon-by-type-container">
                <h1 className="sectionTitleByTypePage">Pokémons du type {type}</h1>
                <div className="pokemon-list">
                    {pokemons.length > 0 ? (
                        pokemons.map((pokemon) => (
                            <PokemonCard key={pokemon.id} pokemon={pokemon} />
                        ))
                    ) : (
                        <p>Aucun Pokémon trouvé pour ce type.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PokemonByTypePage;
