import React, { useState, useEffect } from "react";
import {fetchPokemons} from "../../services/pokemonService";
import useFetch from "../../common/hooks/useFetch";
import Header from "../../common/components/Header";
import Footer from "../../common/components/Footer";
import "./BattlePage.css";

const BattlePage = () => {
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [wildPokemon, setWildPokemon] = useState(null);
    const [isBattleStarted, setIsBattleStarted] = useState(false);
    const [message, setMessage] = useState("");
    const [pokemonHP, setPokemonHP] = useState(0);
    const [wildHP, setWildHP] = useState(0);
    const [showWildPokemon, setShowWildPokemon] = useState(false);
    const { data: randomPokemons, loading, error } = useFetch(fetchPokemons, 6);
    const [allPokemons, setAllPokemons] = useState([]);

    useEffect(() => {
        const loadAllPokemons = async () => {
            const all = await fetchPokemons(); // Charge tous les Pokémon
            setAllPokemons(all);
        };
        loadAllPokemons();
    }, []);

    const startBattle = () => {
        if (!selectedPokemon) return;

        const selected = randomPokemons.find((pokemon) => pokemon.id === selectedPokemon);

        let wild;
        do {
            wild = allPokemons[Math.floor(Math.random() * allPokemons.length)];
        } while (wild.id === selected.id);

        setWildPokemon(wild);
        setPokemonHP(selected.stats.HP);
        setWildHP(wild.stats.HP);

        setIsBattleStarted(true);
        setMessage("En attente d'un adversaire...");

        setTimeout(() => {
            setShowWildPokemon(true);
            determineWinner(selected, wild);
        }, 5000);
    };

    const determineWinner = (selected, wild) => {
        if (selected.stats.HP > wild.stats.HP) {
            setMessage(`${selected.name} a gagné avec ${selected.stats.HP} HP !`);
        } else if (selected.stats.HP < wild.stats.HP) {
            setMessage(`${wild.name} a gagné avec ${wild.stats.HP} HP !`);
        } else {
            setMessage(`Match nul ! Les deux Pokémon ont ${selected.stats.HP} HP.`);
        }
    };

    const handleSelectPokemon = (pokemonId) => {
        setSelectedPokemon(pokemonId);
        setMessage("Pokémon sélectionné !");
    };

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur lors du chargement des Pokémon : {error}</p>;

    return (
        <div>
            <Header />
            <div className="battle-container">
                <h1>Combat de Pokémon</h1>

                {!isBattleStarted && (
                    <>
                        <h2>Choisissez un Pokémon pour le combat</h2>
                        <div className="pokemon-selection">
                            {randomPokemons.map((pokemon) => (
                                <div
                                    key={pokemon.id}
                                    className={`pokemon-card ${
                                        selectedPokemon === pokemon.id ? "selected" : ""
                                    }`}
                                    onClick={() => handleSelectPokemon(pokemon.id)}
                                >
                                    <img className="image-combat" src={pokemon.image} alt={pokemon.name}/>
                                    <p>{pokemon.name}</p>
                                    <p className="pokemon-hp">HP : {pokemon.stats.HP}</p>
                                </div>
                            ))}
                        </div>
                        {selectedPokemon && (
                            <button onClick={startBattle} className="battle-btn">
                                Lancer le combat
                            </button>
                        )}
                    </>
                )}

                {isBattleStarted && (
                    <div className="battle-stage">
                        <div className="pokemon">
                            <h3>{randomPokemons.find((p) => p.id === selectedPokemon).name}</h3>
                            <img
                                src={randomPokemons.find((p) => p.id === selectedPokemon).image}
                                alt="Votre Pokémon"
                                className="pokemon-image"
                            />
                            <p>HP : {pokemonHP}</p>
                        </div>

                        <div className="battle-message">
                            <p>{message}</p>
                        </div>

                        {showWildPokemon && wildPokemon && (
                            <div className="pokemon">
                                <h3>{wildPokemon.name}</h3>
                                <img
                                    src={wildPokemon.image}
                                    alt="Pokémon sauvage"
                                    className="pokemon-image"
                                />
                                <p>HP : {wildHP}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default BattlePage;
